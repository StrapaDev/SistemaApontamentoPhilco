using SistemaApontamentoPhilco.Model.Model;
using SistemaApontamentoPhilco.Service.Service;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SistemaApontamentoPhilco.Utils
{
    public class CustomAuthorization : AuthorizeAttribute
    {
        private MenuService _menuService;
        private UsuarioService _usuarioService;

        public string URL;

        public CustomAuthorization()
        {
            _menuService = new MenuService();
            _usuarioService = new UsuarioService();
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool hasAccess = false;
            Menu menu = new Menu();
            List<Menu> listaMenuUsuario = new List<Menu>();

            Usuario usuario = _usuarioService.GetAll().FirstOrDefault(u => u.Login == httpContext.User.Identity.Name && u.Inativo == false);

            if (httpContext.Session["Menu"] != null)
                listaMenuUsuario = (List<Menu>)httpContext.Session["Menu"];
            else
            {
                if (usuario != null)
                    listaMenuUsuario = usuario.Perfil.Menu.ToList();
                else
                    hasAccess = false;
            }

            //if (listaMenuUsuario.Count > 0)
            //{
                List<Menu> listaMenu = listaMenuUsuario;
                if (URL == "\\Home\\Index")
                    hasAccess = true;

                //foreach (Menu mn in listaMenu)
                //{
                    hasAccess = true;
                //}

                httpContext.Session["Menu"] = listaMenu;
            //}

            if (httpContext.Session["User"] == null)
                hasAccess = false;

            return hasAccess;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(
                                   new RouteValueDictionary
                                   {
                                       { "action", "Index" },
                                       { "controller", "Login" }
                                   });
        }
    }
}