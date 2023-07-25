using BIOMEDICO.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BIOMEDICO.Clases
{
    public static class Utilidades
    {
        public static Usuarios ActiveUser
        {
            get
            {
                return HttpContext.Current.Session["ActiveUser"] as Usuarios;
            }
            set
            {
                HttpContext.Current.Session.Timeout = 60;
                HttpContext.Current.Session["ActiveUser"] = value;
            }
        }
        public static List<ASignarPermisos> Getlistapermisos()
        {
            List<ASignarPermisos> lista = new List<ASignarPermisos>();
            using (var db= new BIOMEDICO.Models.BIOMEDICOEntities5())
            {
                lista = db.ASignarPermisos.Where(w=>w.CodRol== ActiveUser.CodRol).ToList();
                foreach (var item in lista)
                {
                    item.Permisos = db.Permisos.FirstOrDefault(w => w.IdPermiso == item.CodPermiso);
                }
            }
            return lista;
        }

        public static IQueryable<TSource> Page<TSource>(this IQueryable<TSource> source, int page, int pageSize)
        {
            return source.Skip((page - 1) * pageSize).Take(pageSize);
        }

        //used by LINQ
        public static IEnumerable<TSource> Page<TSource>(this IEnumerable<TSource> source, int page, int pageSize)
        {
            return source.Skip((page - 1) * pageSize).Take(pageSize);
        }

        /// <summary>
        /// Devuelve todos los elementos distintos de la fuente dada, donde "distinción"
        /// se determina mediante una proyección y el comparador especificado para el tipo proyectado.Preguntale a wilder
        /// </summary>
        /// <remarks>
        /// Este operador utiliza la ejecución diferida y transmite los resultados, aunque
        /// se retiene un conjunto de claves ya vistas. Si se ve una clave varias veces,
        /// solo se devuelve el primer elemento con esa clave.
        /// </remarks>
        /// <typeparam name="TSource">Tipo de secuencia de origen</typeparam>
        /// <typeparam name="TKey">Tipo del elemento proyectado</typeparam>
        /// <param name="data">secuencia de fuente</param>
        /// <param name="keySelector">Proyección para determinar "distinción"</param>
        /// <param name="comparer">El comparador de igualdad que se utiliza para determinar si las claves son iguales o no.
        /// Si es nulo, se usa el comparador de igualdad predeterminado para <c> TSource </c>. </param>
        /// <returns>Una secuencia que consta de elementos distintos de la secuencia de origen,
        /// comparándolos por la proyección de clave especificada. </returns>
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> data,
          Func<TSource, TKey> keySelector, IEqualityComparer<TKey> comparer)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));
            if (keySelector == null) throw new ArgumentNullException(nameof(keySelector));

            return _(); IEnumerable<TSource> _()
            {
                var knownKeys = new HashSet<TKey>(comparer);
                foreach (var element in data)
                {
                    if (knownKeys.Add(keySelector(element)))
                        yield return element;
                }
            }
        }
        /// < suma >
        /// Devuelve todos los elementos distintos de la fuente dada, donde "distinción"
        /// se determina mediante una proyección y el comparador de igualdad predeterminado para el tipo proyectado.Preguntale a wilder
        /// </ resumen >
        /// < comentarios >
        /// Este operador utiliza la ejecución diferida y transmite los resultados, aunque
        /// se retiene un conjunto de claves ya vistas. Si se ve una clave varias veces,
        /// solo se devuelve el primer elemento con esa clave.
        /// </ comentarios >
        /// < typeparam  name = " TSource " > Tipo de secuencia de origen </ typeparam >
        /// < typeparam  name = " TKey " > Tipo del elemento proyectado </ typeparam >
        /// < param  name = " source " > secuencia de fuente </ param >
        /// < param  name = " keySelector " > Proyección para determinar "distinción" </ param >
        /// < devuelve > Una secuencia que consta de elementos distintos de la secuencia de origen,
        /// comparándolos por la proyección de clave especificada. </ devuelve >
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector)
        {
            return source.DistinctBy(keySelector, null);
        }

        public static void WriteExceptionLog(Exception ex, string filepath)
        {

            if (!Directory.Exists(filepath + "\\" + DateTime.Now.ToShortDateString().Replace("/", "")))
            {
                Directory.CreateDirectory(filepath + "\\" + DateTime.Now.ToShortDateString().Replace("/", ""));
            };

            File.WriteAllText(filepath + "\\" + DateTime.Now.ToShortDateString().Replace("/", "") + "\\" + DateTime.Now.TimeOfDay.Ticks.ToString() + ".txt", JsonConvert.SerializeObject(ex));
        }

    }
}