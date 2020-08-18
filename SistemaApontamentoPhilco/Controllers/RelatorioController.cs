using OfficeOpenXml;
using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Service;
using SistemaApontamentoPhilco.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SistemaApontamentoPhilco.Controllers
{
    public class RelatorioController : Controller
    {
        ApontamentoService _apontamentoService = new ApontamentoService();

        // GET: Relatorio
        [CustomAuthorization]
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorization]
        public ActionResult ComCargaPlanilha()
        {
            return View();
        }

        [HttpPost]
        public ActionResult UploadFile(HttpPostedFileBase file)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    Dictionary<string, string> listaRetorno = new Dictionary<string, string>();

                    string readFileName = Path.GetFileName(file.FileName);
                    string readFilePath = Path.Combine(Server.MapPath("~/Temp"), readFileName);
                    file.SaveAs(readFilePath);

                    var readFileTemplate = new FileInfo(readFilePath);
                    var readFilePck = new ExcelPackage(readFileTemplate, true);

                    int linha = 1;
                    //int coluna = 1;
                    try
                    {
                        var readFileWorksheet = readFilePck.Workbook.Worksheets[1];

                        List<string> listFromPlanilha = new List<string>();
                        while (!string.IsNullOrEmpty(readFileWorksheet.Cells[linha, 1].Value + ""))
                        {
                            listFromPlanilha.Add(readFileWorksheet.Cells[linha, 1].Value.ToString());
                            linha++;
                        }

                        var listFromTabela = _apontamentoService.GetAll();

                        foreach (string item in listFromPlanilha)
                        {
                            Apontamento apontamento = listFromTabela.Where(o => o.NumeroSerie == item).FirstOrDefault();
                            listaRetorno.Add(item, apontamento == null ? "Número de Série desconhecido. Sequencial não relacionado ao serial pesquisado." : apontamento.Sequencial);
                        }

                        //string download = "RelatorioSerialXSequencial_" + DateTime.Now.ToString("yyyy.MM.dd_HH.mm.ss.ffff") + ".xlsx";
                        //string writeFileName = Server.MapPath("~/Temp") + "\\" + download;
                        //string writeFileTemplate = Server.MapPath("~/Templates/RelatorioSerialXSequencial.xlsx");

                        //System.IO.File.Copy(writeFileTemplate, writeFileName);
                        //System.IO.File.SetAttributes(writeFileName, FileAttributes.Normal);

                        //ExcelPackage package = new ExcelPackage(new FileInfo(writeFileName));
                        //ExcelWorksheet writeFileWorksheet = package.Workbook.Worksheets["SerialXSequencial"];

                        //linha = 2;
                        //foreach (var item in listaRetorno)
                        //{
                        //    coluna = 1;
                        //    writeFileWorksheet.Cells[linha, coluna++].Value = item.Key;
                        //    writeFileWorksheet.Cells[linha, coluna++].Value = item.Value;
                        //    linha++;
                        //}

                        //return File(package.GetAsByteArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", download);

                        System.GC.Collect();

                        StringBuilder builder = new StringBuilder();
                        builder.Append("Numero de Serie;Sequencial\n");

                        List<string> rows = new List<string>();
                        foreach (var item in listaRetorno)
                        {
                            rows.Add(item.Key + ";" + item.Value);
                        }

                        builder.Append(string.Join("\n", rows.ToArray()));

                        Response.ContentEncoding = Encoding.GetEncoding("ISO-8859-1");
                        Response.Clear();
                        Response.ContentType = "text/csv";
                        Response.AddHeader("Content-Disposition", "attachment;filename=RelatorioSerialXSequencial_" + DateTime.Now.ToString("yyyy.MM.dd_HH.mm.ss.ffff") + ".csv");
                        Response.Write(builder.ToString());
                        Response.End();

                        System.GC.Collect();
                    }
                    catch (Exception ex)
                    {
                        TempData["MensagemErro"] = "Ocorreu um erro na geração ou na importação do arquivo. " + ex.InnerException;
                    }
                    System.IO.File.Delete(readFilePath);
                }
                else
                    TempData["MensagemErro"] = "O arquivo está vazio.";
                return RedirectToAction("ComCargaPlanilha", "Relatorio");
            }
            catch (Exception)
            {
                TempData["MensagemErro"] = "Selecione um arquivo válido.";
                return RedirectToAction("ComCargaPlanilha", "Relatorio");
            }
        }
    }
}