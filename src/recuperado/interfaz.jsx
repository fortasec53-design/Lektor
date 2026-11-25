/**
 * Interfaz recuperada del paquete Vite `assets/index-BzLNX1sw.js`
 * (Lector de encuestas 1.0.9, commit 5ad52a6, React 19.3.1).
 *
 * Los nombres de las pantallas se restauraron. Los nombres internos de
 * estado siguen cortos porque el empaquetador los había minificado y
 * renombrarlos a ciegas cambiaría el comportamiento.
 *
 * Pantallas: Aplicacion, PantallaAsistente, PantallaTablero,
 * PantallaSeguimiento, PantallaBandeja, PantallaCarga, PantallaRevision,
 * PantallaOperacion (procesando, exportar, usuarios), PantallaConectores,
 * PantallaPersonalizacion, Bienvenida.
 *
 * El aviso `dudosa` se agregó para la lectura con Tesseract: la compilación
 * original solo nombraba doble_marca, sin_marca, marca_tenue y posible_borron.
 */
import {
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

var d = `data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231d4ed8'/%3e%3cstop%20offset='.6'%20stop-color='%232563eb'/%3e%3cstop%20offset='1'%20stop-color='%2360a5fa'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231d4ed8'/%3e%3cstop%20offset='1'%20stop-color='%233b82f6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='0'%20y1='1'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%232563eb'/%3e%3cstop%20offset='1'%20stop-color='%2393c5fd'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='256'%20height='256'%20rx='58'%20fill='%23eff6ff'/%3e%3crect%20x='1'%20y='1'%20width='254'%20height='254'%20rx='57'%20fill='none'%20stroke='%232563eb'%20stroke-opacity='.12'%20stroke-width='2'/%3e%3cg%20transform='translate(128%20128)%20scale(1.12)%20translate(-135%20-133)'%3e%3cpolygon%20points='62,99%2095,67%2095,109%2062,138'%20fill='url(%23c)'%20fill-opacity='.75'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='62,150%20160,47%20208,47%2062,198'%20fill='url(%23a)'%20fill-opacity='.85'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='111,156%20130,135%20200,199%20151,199'%20fill='url(%23b)'%20fill-opacity='.85'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpath%20d='M89%20125L110%20148'%20stroke='%23fff'%20stroke-opacity='.6'%20stroke-width='1.6'/%3e%3cpath%20d='M62%20138V100M62%20196V151L140%2068'%20fill='none'%20stroke='%239AC43A'%20stroke-opacity='0.8'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cpath%20d='M163%2050H204'%20stroke='%23fff'%20stroke-opacity='.7'%20stroke-width='1.4'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e`;
var m = `1.0.9`;
var h = `5ad52a6`;
function BarraVersion({ abrir: e }) {
  return (
    <footer className={`v5-estado`}>
      <button
        className={`v5-ver`}
        title={`Lector v${m} · commit ${h}`}
        aria-label={`Lector v${m} · commit ${h}`}
        onClick={e}
      >
        {`v`}
        {m}
      </button>
    </footer>
  );
}
function NotasVersion({ t: e }) {
  let t = e.replace(/<[^>]+>/g, ``).trim();
  return (
    <div className={`v5-notas`}>
      {t
        .split(
          `
`,
        )
        .map((e, t) =>
          /^#+\s/.test(e) ? (
            <b key={t}>{e.replace(/^#+\s/, ``)}</b>
          ) : /^\s*[-*•]\s/.test(e) ? (
            <div className={`v5-nota-li`} key={t}>
              {`• `}
              {e.replace(/^\s*[-*•]\s/, ``)}
            </div>
          ) : e.trim() ? (
            <p key={t}>{e}</p>
          ) : null,
        )}
    </div>
  );
}
function ModalActualizacion({ cerrar: e }) {
  let [t, n] = useState(null);
  useEffect(() => {
    window.ocr.actualizador.info().then((e) => n(e));
    let t = window.ocr.actualizador.alCambiar((e) => n(e));
    window.ocr.actualizador.buscar().catch(() => void 0);
    let r = (t) => {
      t.key === `Escape` && e();
    };
    return (
      window.addEventListener(`keydown`, r),
      () => {
        t(), window.removeEventListener(`keydown`, r);
      }
    );
  }, [e]);
  async function r() {
    let e = window.prompt(`Correo de administración para cambiar el canal:`);
    if (!e) return;
    let r = t?.canal === `beta` ? `estable` : `beta`;
    if (window.confirm(`¿Cambiar al canal ${r}?`))
      try {
        n(await window.ocr.actualizador.canal(e, r));
      } catch {
        window.alert(`Solo administración puede cambiar el canal.`);
      }
  }
  let i = t?.fase;
  return (
    <div
      className={`v5-modal`}
      role={`dialog`}
      aria-label={`Acerca de`}
      onClick={e}
    >
      <div className={`card v5-acerca`} onClick={(e) => e.stopPropagation()}>
        <button
          className={`v5-cerrar`}
          aria-label={`Cerrar`}
          onClick={e}
        >{`×`}</button>
        <div className={`v5-acerca-cab`}>
          <img src={d} alt={``} />
          <div>
            <h2>{`Lector`}</h2>
            <small className={`muted`}>
              {`Versión `}
              {m}
            </small>
          </div>
        </div>
        <div
          className={`v5-act-card${i === `disponible` || i === `listo` ? ` nueva` : ``}`}
        >
          {!t || i === `buscando` || i === `inactivo` ? (
            <span>
              {t && !t.empaquetada ? `Versión de desarrollo` : `Comprobando…`}
            </span>
          ) : i === `al-dia` ? (
            <span>{`✓ Tienes la última versión`}</span>
          ) : i === `disponible` ? (
            <>
              <span>
                {`Actualización disponible · v`}
                {t.version}
              </span>
              <button
                className={`btn primary`}
                onClick={() => void window.ocr.actualizador.descargar()}
              >{`Descargar`}</button>
            </>
          ) : i === `descargando` ? (
            <div className={`v5-ancho`}>
              <span>
                {`Descargando `}
                {t.progreso ?? 0}
                {`%`}
              </span>
              <div className={`v5-bar`}>
                <i
                  style={{
                    width: `${t.progreso ?? 0}%`,
                  }}
                />
              </div>
            </div>
          ) : i === `listo` ? (
            <>
              <span>
                {`v`}
                {t.version}
                {` lista para instalar`}
              </span>
              <button
                className={`btn primary`}
                onClick={() => void window.ocr.actualizador.instalar()}
              >{`Reiniciar y actualizar`}</button>
            </>
          ) : (
            <>
              <span className={`err`}>{t.error}</span>
              <button
                className={`btn`}
                onClick={() => void window.ocr.actualizador.buscar()}
              >{`Reintentar`}</button>
            </>
          )}
        </div>
        <h3>{`Notas de la versión`}</h3>
        {t?.notas ? (
          createElement(NotasVersion, {
            t: t.notas,
          })
        ) : (
          <p
            className={`muted`}
          >{`Las notas aparecen al conectarse a internet.`}</p>
        )}
        <details className={`v5-tecnico`}>
          <summary>{`Detalles técnicos`}</summary>
          <dl>
            <dt>{`Versión`}</dt>
            <dd>{m}</dd>
            <dt>{`Commit`}</dt>
            <dd>{h}</dd>
            <dt>{`Canal`}</dt>
            <dd>
              {t?.canal ?? `estable`}
              {` `}
              <button
                className={`link`}
                onClick={() => void r()}
              >{`Cambiar`}</button>
            </dd>
            <dt>{`Origen`}</dt>
            <dd>{t?.origen ?? `—`}</dd>
            <dt>{`Distribución`}</dt>
            <dd>{t?.empaquetada ? `Instalador Windows` : `Desarrollo`}</dd>
            <dt>{`ID de instalación`}</dt>
            <dd>
              <code>{t?.instalacion ?? `—`}</code>
            </dd>
          </dl>
          <small
            className={`muted`}
          >{`El ID de instalación solo se guarda en este equipo.`}</small>
        </details>
      </div>
    </div>
  );
}
var y = `lector.idioma`,
  b = {
    Trabajo: `Work`,
    Encuestas: `Surveys`,
    Administración: `Admin`,
    "Asistente IA": `AI assistant`,
    "Panel de avance": `Progress`,
    Seguimiento: `Tracking`,
    "Bandeja de entrada": `Inbox`,
    "1 · Subir lote": `1 · Upload batch`,
    Procesando: `Processing`,
    "2 · Revisar": `2 · Review`,
    "3 · Exportar": `3 · Export`,
    Conectores: `Connectors`,
    "Usuarios y roles": `Users & roles`,
    Personalización: `Settings`,
    Subir: `Upload`,
    Revisar: `Review`,
    Exportar: `Export`,
    Proyecto: `Project`,
    "¿Dudas?": `Questions?`,
    "Pregunta al Asistente o abre la guía rápida (F1).": `Ask the Assistant or open the quick guide (F1).`,
    "CONFIDENCIAL · datos de menores y víctimas": `CONFIDENTIAL · data of minors and victims`,
    "Siguiente paso": `Next step`,
    "Subir lote de encuestas": `Upload survey batch`,
    "Encuestas capturadas": `Surveys captured`,
    "Por revisar": `To review`,
    Lotes: `Batches`,
    Exportaciones: `Exports`,
    "Ir a revisar →": `Go to review →`,
    "Ir a exportar →": `Go to export →`,
    "Subir encuestas →": `Upload surveys →`,
    "Sube las encuestas escaneadas": `Upload the scanned surveys`,
    "Arrastra aquí tus PDF": `Drop your PDFs here`,
    "Elegir archivos": `Choose files`,
    "Revisa las marcas dudosas": `Review the doubtful marks`,
    "Todo revisado. Exporta tus resultados": `All reviewed. Export your results`,
    "Convierte encuestas en papel en datos, en 3 pasos": `Turn paper surveys into data, in 3 steps`,
    "Empezar · subir mi primer lote →": `Start · upload my first batch →`,
    omitir: `skip`,
    Asistente: `Assistant`,
  };
function x() {
  return localStorage.getItem(y) === `en` ? `en` : `es`;
}
function S(e) {
  localStorage.setItem(y, e),
    (document.documentElement.lang = e),
    window.dispatchEvent(new CustomEvent(`idioma`));
}
function tr(e) {
  return x() === `en` ? (b[e] ?? e) : e;
}
function useIdioma() {
  let [e, t] = useState(x);
  return (
    useEffect(() => {
      let e = () => t(x());
      return (
        window.addEventListener(`idioma`, e),
        () => window.removeEventListener(`idioma`, e)
      );
    }, []),
    e
  );
}
var T = (e) => /^(hecho|terminado)/i.test(e.trim()),
  E = (e) => /^(cancelado|no aplica)/i.test(e.trim());
function D(e) {
  let t = e.pasos.filter((e) => !E(e.estado)),
    n = t.filter((e) => e.hecho).length;
  return {
    ...e,
    total: t.length,
    hechos: n,
    pct: t.length ? n / t.length : 0,
  };
}
function fusionarSeguimiento(e, t, n, r = []) {
  let i = r.filter((e) => e.estado === `aplicado`).sort((e, t) => e.id - t.id),
    a = {};
  for (let e of i)
    e.tipo === `paso` &&
      e.paso &&
      e.despues &&
      (a[e.actividad + `|` + e.paso] = e.despues);
  let o = e.datos;
  if (!o) return null;
  let s = e.extras || {},
    c = o.vinculos?.observaciones ?? s.links?.observaciones ?? {},
    l = {};
  for (let [e, t] of Object.entries(c)) l[e] = [...t];
  for (let [e, t] of Object.entries(n.obs ?? {}))
    l[e] = [
      ...(l[e] ?? []),
      ...t.map((e) => ({
        ...e,
        local: !0,
      })),
    ];
  for (let e of i.filter((e) => e.tipo === `observacion` && e.actividad))
    l[e.actividad] = [
      ...(l[e.actividad] ?? []),
      {
        fecha: e.fecha.slice(0, 10),
        texto: e.texto,
        autor: e.autor === `ia` ? `IA` : e.autor,
        ia: !0,
      },
    ];
  let u = o.pendientesVivo ?? s.pendientes,
    d = {};
  for (let e of s.secuencias?.proyectos ?? [])
    for (let t of e.secuencias) {
      let e = t.pasos.map((e) => {
        let r = n.pasos?.[t.codigo + `|` + e.paso],
          i = r === void 0 ? a[t.codigo + `|` + e.paso] : void 0,
          o = r ?? i ?? e.estado;
        return {
          ...e,
          estado: o,
          hecho: r !== void 0 || i !== void 0 ? T(o) : e.hecho,
          local: r !== void 0,
          ia: i !== void 0,
        };
      });
      d[t.codigo] = D({
        ...t,
        pasos: e,
      });
    }
  for (let e of t?.actividades ?? []) {
    let t = e.pasos.filter((e) => e.auto);
    if (!t.length) continue;
    let n = d[e.codigo] ?? {
        codigo: e.codigo,
        nombre: e.nombre,
        pasos: [],
        total: 0,
        hechos: 0,
        pct: 0,
      },
      r = [
        ...n.pasos,
        ...t.map((e) => ({
          paso: e.nombre,
          fecha: ``,
          estado: e.estado,
          hecho: T(e.estado),
          ocr: !0,
          detalle: e.detalle,
        })),
      ];
    d[e.codigo] = D({
      ...n,
      pasos: r,
    });
  }
  let f = (o.kpi?.encuestas ?? []).map((e) => {
      let n = t?.cobertura.find(
        (t) => t.unidad === e.u && t.instrumento === e.i,
      );
      return n
        ? {
            ...e,
            apl: Math.max(e.apl ?? 0, n.aplicadas),
            ocr: !0,
          }
        : e;
    }),
    p = new Set((n.diarios ?? []).map((e) => e.id)),
    m = [
      ...(o.diariosVivo?.entradas ?? s.diarios?.entradas ?? []).filter(
        (e) => !p.has(e.id),
      ),
      ...(n.diarios ?? []),
    ].filter((e) => e.estado !== `Borrada`);
  return {
    d: o,
    documentos: o.vinculos?.documentos ?? s.links?.documentos ?? [],
    observaciones: l,
    pendientes: u?.pendientes ?? [],
    personas: u?.personas ?? [],
    nuevas: [...(o.pendientesVivo?.nuevas ?? []), ...(n.nuevas ?? [])],
    bitacora: [
      ...i
        .filter((e) => e.tipo === `bitacora` || e.tipo === `alerta`)
        .reverse()
        .map((e) => ({
          fecha: e.fecha.slice(0, 10),
          hora: e.fecha.slice(11, 16),
          autor: e.autor === `ia` ? `IA` : e.autor,
          proyecto: e.actividad.split(`-`)[0] ?? ``,
          sede: ``,
          tipo: e.tipo === `alerta` ? `Alerta (IA)` : `Bitácora (IA)`,
          nota: e.texto,
          fuente: e.fuente_nombre ? `${e.fuente_tipo}: ${e.fuente_nombre}` : ``,
          estado: ``,
          uso: ``,
          iso: e.fecha,
          ia: !0,
        })),
      ...(s.bitacora?.notas ?? []),
    ],
    diarios: m,
    diarPersonas: Array.from(
      new Set([...(s.diarios?.personas ?? []), ...m.map((e) => e.persona)]),
    ),
    secuencias: d,
    encuestas: f,
    eventos: s.eventos?.eventos ?? [],
    snapshots: e.snapshots ?? {},
  };
}
var k = (e) => Math.floor(Date.parse(e.slice(0, 10) + `T00:00:00Z`) / 864e5);
function ee(e, t, n, r) {
  let i = {};
  for (let n of [...e.actividades, ...t.actividades])
    i[n.codigo] || (i[n.codigo] = n.proyecto);
  let a = [];
  for (let [e, o] of Object.entries(t.porUnidad ?? {})) {
    let t = i[e];
    if (t && n(t))
      for (let n of o)
        r(e, n.u) ||
          a.push({
            c: e,
            p: t,
            u: n.u,
            pct: +n.pct || 0,
            fin: n.fin,
          });
  }
  return a;
}
function te(e, t) {
  let n = k(t),
    r = 0,
    i = 0,
    a = 0,
    o = 0,
    s = 0;
  for (let t of e) {
    let e = t.fin ? k(t.fin) : null;
    (r += t.pct),
      t.pct >= 1 && a++,
      e !== null && e <= n && i++,
      e !== null && t.pct < 1 && e < n && o++,
      e !== null && t.pct < 1 && e >= n && e <= n + 7 && s++;
  }
  let c = e.length;
  return {
    n: c,
    avance: c ? r / c : null,
    prog: c ? i / c : null,
    nprog: i,
    term: a,
    venc: o,
    prox: s,
  };
}
var ne = {
    avance: `Verde si el avance real alcanza lo programado; amarillo si la brecha es de hasta 10 pts; rojo si es mayor.`,
    term: `Verde si terminaron todas las que ya debían; amarillo si al menos la mitad; rojo si menos.`,
    venc: `Verde con 0; amarillo de 1 a 3; rojo con más de 3.`,
    prox: `Verde hasta 5; amarillo de 6 a 15; rojo con más de 15.`,
    evid: `Verde con 50 % o más; amarillo desde 25 %; rojo debajo.`,
    enc: `Verde con 90 % o más de la meta; amarillo desde 50 %; rojo debajo.`,
  },
  A = (e) => (e == null ? `—` : Math.round(e * 100) + ` %`);
function re(e, t, n, r, i) {
  let a = e.d,
    o = ee(a, a, t, i),
    s = te(o, a.corte),
    c = n ? te(ee(a, n, t, i), n.corte) : null,
    l = n ? ` vs ` + n.corte.slice(8, 10) + `/` + n.corte.slice(5, 7) : ``,
    u = (e, t, n) => {
      if (!c || e === null) return [`sin instantánea previa`, `nd`];
      if (Math.abs(e) < 1e-9) return [`= sin cambio` + l, `igual`];
      let r = n ? e > 0 : e < 0;
      return [(e > 0 ? `▲ +` : `▼ `) + t(Math.abs(e)) + l, r ? `bien` : `mal`];
    },
    d = (e) => String(e),
    f = [],
    p = s.avance === null || s.prog === null ? null : s.avance - s.prog,
    m = u(
      c && c.avance !== null && s.avance !== null
        ? Math.round((s.avance - c.avance) * 1e3) / 10
        : null,
      (e) => String(e).replace(`.`, `,`) + ` pts`,
      !0,
    );
  f.push({
    id: `avance`,
    lab: `% de avance`,
    corto: A(s.avance),
    sub: `programado a la fecha: ` + A(s.prog),
    sem:
      p === null
        ? `Sin datos`
        : p >= -1e-9
          ? `Verde`
          : p >= -0.1
            ? `Amarillo`
            : `Rojo`,
    tr: m[0],
    trCls: m[1],
    tip: ne.avance,
  }),
    (m = u(c ? s.term - c.term : null, d, !0)),
    f.push({
      id: `term`,
      lab: `Terminadas`,
      corto: s.term + `/` + s.n,
      sub:
        (s.nprog
          ? s.nprog + ` ya debían terminar`
          : `ninguna debía terminar aún`) + ` · filas por unidad`,
      sem: s.n
        ? s.term >= s.nprog
          ? `Verde`
          : s.term >= s.nprog / 2
            ? `Amarillo`
            : `Rojo`
        : `Sin datos`,
      tr: m[0],
      trCls: m[1],
      tip: ne.term,
    }),
    (m = u(c ? s.venc - c.venc : null, d, !1)),
    f.push({
      id: `venc`,
      lab: `Vencidas`,
      corto: String(s.venc),
      sub: `fecha fin antes de hoy y sin terminar`,
      sem: s.n
        ? s.venc === 0
          ? `Verde`
          : s.venc <= 3
            ? `Amarillo`
            : `Rojo`
        : `Sin datos`,
      tr: m[0],
      trCls: m[1],
      tip: ne.venc,
    }),
    (m = u(c ? s.prox - c.prox : null, d, !1)),
    f.push({
      id: `prox`,
      lab: `Por vencer en 7 días`,
      corto: String(s.prox),
      sub: `sin terminar`,
      sem: s.n
        ? s.prox <= 5
          ? `Verde`
          : s.prox <= 15
            ? `Amarillo`
            : `Rojo`
        : `Sin datos`,
      tr: m[0],
      trCls: m[1],
      tip: ne.prox,
    });
  let h = Array.from(new Set(o.map((e) => e.c))),
    g = h.filter(r).length,
    _ = h.length ? g / h.length : null;
  f.push({
    id: `evid`,
    lab: `Con evidencia o documento`,
    corto: A(_),
    sub: `${g} de ${h.length} actividades con documento ligado`,
    sem:
      _ === null
        ? `Sin datos`
        : _ >= 0.5
          ? `Verde`
          : _ >= 0.25
            ? `Amarillo`
            : `Rojo`,
    tr: `sin tendencia (la instantánea no guarda documentos)`,
    trCls: `nd`,
    tip: ne.evid,
  });
  let v = new Set(a.proyectos.filter((e) => t(e.proyecto)).map((e) => e.sigla)),
    y = e.encuestas.filter(
      (e) =>
        v.has(e.p) &&
        !(a.unidadesFuera ?? []).includes(e.u) &&
        /base/i.test(e.m) &&
        e.meta !== null,
    );
  if (y.some((e) => e.apl !== null)) {
    let e = y.reduce((e, t) => e + (t.apl || 0), 0),
      t = y.reduce((e, t) => e + (t.meta || 0), 0),
      n = t ? e / t : null;
    f.push({
      id: `enc`,
      lab: `Encuestas línea base`,
      corto: e + `/` + t,
      sub:
        `aplicadas / meta · ` +
        A(n) +
        (y.some((e) => e.ocr) ? ` · incluye lectura OCR` : ``),
      sem:
        n === null
          ? `Sin datos`
          : n >= 0.9
            ? `Verde`
            : n >= 0.5
              ? `Amarillo`
              : `Rojo`,
      tr: `aplicadas según hoja y OCR`,
      trCls: `nd`,
      tip: ne.enc,
    });
  }
  return f;
}
async function ie() {
  let [e, t, n, r] = await Promise.all([
      window.ocr.seguimiento.datos(),
      window.ocr.call(`tablero`, {}).catch(() => null),
      window.ocr.seguimiento.local(),
      window.ocr.call(`cambios`, {}),
    ]),
    i = fusionarSeguimiento(e, t, n, r);
  return i
    ? {
        actividades: Object.values(i.secuencias).map((e) => ({
          codigo: e.codigo,
          nombre: e.nombre,
          pasos: e.pasos.map((e) => ({
            paso: e.paso,
            estado: e.estado,
          })),
        })),
      }
    : {
        actividades: [],
      };
}
async function ae(e) {
  let t = await ie(),
    n = await window.ocr.subir({
      ...e,
      catalogo: t,
    });
  return window.dispatchEvent(new CustomEvent(`actualizaciones`)), n;
}
async function oe(e, t) {
  await window.ocr.call(`cambio_resolver`, {
    id: e,
    accion: t,
    usuario: `usuario`,
  }),
    window.dispatchEvent(new CustomEvent(`actualizaciones`));
}
var se = [
    [`documento`, `Documento`],
    [`evidencia`, `Evidencia`],
    [`lote`, `Lote de encuestas`],
    [`diario`, `Entrada de diario`],
  ],
  ce = (e) => `${Math.round(e * 100)} %`;
function le() {
  let [e, t] = useState([]);
  return (
    useEffect(() => {
      let e = () => {
        window.ocr
          .call(`cambios`, {})
          .then(t)
          .catch(() => {});
      };
      return (
        e(),
        window.addEventListener(`actualizaciones`, e),
        window.addEventListener(`proyecto`, e),
        () => {
          window.removeEventListener(`actualizaciones`, e),
            window.removeEventListener(`proyecto`, e);
        }
      );
    }, []),
    {
      cambios: e,
    }
  );
}
var ue = {
    paso: `Paso`,
    observacion: `Observación`,
    bitacora: `Bitácora`,
    alerta: `Alerta`,
  },
  de = (e) => {
    let t = new Date(
      e.replace(` `, `T`).replace(/(Z|[+-]\d\d:?\d\d)?$/, (e) => e || `Z`),
    );
    return isNaN(t.getTime())
      ? e
      : t.toLocaleString(`es-MX`, {
          dateStyle: `short`,
          timeStyle: `short`,
        });
  };
function fe({ c: e }) {
  return (
    <small className={`muted`}>
      {e.autor === `ia`
        ? (e.motor ?? `reglas-locales`) === `reglas-locales`
          ? `🤖 Reglas de la app`
          : `🤖 IA`
        : `👤 ${e.resuelto_por ?? `usuario`}`}
      {e.fuente_nombre
        ? ` · fuente: ${e.fuente_tipo} «${e.fuente_nombre}»`
        : ``}
      {e.fuente_usuario ? ` · subió ${e.fuente_usuario}` : ``}
      {` · `}
      {de(e.fecha)}
    </small>
  );
}
function pe({ c: e }) {
  return (
    <div className={`upd-card ${e.estado}`}>
      <div className={`upd-top`}>
        <span className={`upd-tag ${e.tipo}`}>{ue[e.tipo]}</span>
        <span className={`upd-act`}>{e.actividad || `Sin clasificar`}</span>
        <span className={`upd-conf`} title={e.motivo}>
          {ce(e.confianza)}
        </span>
      </div>
      <div className={`upd-txt`}>
        {e.tipo === `paso` ? (
          <>
            {e.paso}
            {`: `}
            <s>{e.antes}</s>
            {` → `}
            <b>{e.despues}</b>
          </>
        ) : (
          e.texto
        )}
      </div>
      {e.motivo && (
        <small className={`muted`}>
          {`Motivo: `}
          {e.motivo}
        </small>
      )}
      {createElement(fe, {
        c: e,
      })}
      <div className={`upd-acc`}>
        {e.estado === `por_confirmar` && (
          <>
            <button
              className={`primary`}
              disabled={!e.actividad}
              onClick={() => void oe(e.id, `confirmar`)}
            >{`Confirmar`}</button>
            <button
              className={`btn`}
              onClick={() => void oe(e.id, `rechazar`)}
            >{`Rechazar`}</button>
          </>
        )}
        {e.estado === `aplicado` && (
          <button
            className={`btn`}
            onClick={() => void oe(e.id, `deshacer`)}
          >{`↶ Deshacer`}</button>
        )}
        {e.estado === `deshecho` && (
          <button
            className={`btn`}
            onClick={() => void oe(e.id, `rehacer`)}
          >{`↷ Rehacer`}</button>
        )}
        {e.estado !== `por_confirmar` && (
          <span className={`upd-estado ${e.estado}`}>
            {e.estado.replace(`_`, ` `)}
          </span>
        )}
      </div>
    </div>
  );
}
function me({ cambios: e }) {
  let t = e.filter((e) => e.estado === `por_confirmar`),
    n = e.filter((e) => e.estado === `aplicado`).slice(0, 6);
  return (
    <div className={`upd-cola`}>
      <h3>
        {`Por confirmar `}
        <span className={`count`}>{t.length}</span>
      </h3>
      {t.length ? (
        t.map((e) =>
          createElement(pe, {
            c: e,
            key: e.id,
          }),
        )
      ) : (
        <p className={`muted`}>{`Nada pendiente.`}</p>
      )}
      <h3>{`Aplicado por la IA (reciente)`}</h3>
      {n.length ? (
        n.map((e) =>
          createElement(pe, {
            c: e,
            key: e.id,
          }),
        )
      ) : (
        <p className={`muted`}>{`Sin cambios aún.`}</p>
      )}
    </div>
  );
}
function he({ compacto: e }) {
  let [t, n] = useState(`diario`),
    [r, i] = useState(``),
    [a, o] = useState(``),
    [s, c] = useState(``);
  async function u(e) {
    if (e || r.trim()) {
      c(`Leyendo y clasificando…`);
      try {
        let n = await ae({
          tipo: t,
          texto: r,
          nombre: a || void 0,
          ruta: e,
          usuario: `usuario`,
        });
        c(
          `Listo: ${n.aplicados} cambio(s) aplicados, ${n.por_confirmar} por confirmar.`,
        ),
          i(``),
          o(``);
      } catch (e) {
        c(String(e));
      }
    }
  }
  return (
    <div className={e ? `upd-subir compacto` : `upd-subir`}>
      <div className={`asis-fila`}>
        <select value={t} onChange={(e) => n(e.target.value)}>
          {se.map(([e, t]) => (
            <option value={e} key={e}>
              {t}
            </option>
          ))}
        </select>
        <input
          placeholder={`Nombre (opcional)`}
          value={a}
          onChange={(e) => o(e.target.value)}
        />
      </div>
      <textarea
        rows={e ? 2 : 3}
        placeholder={`Describe la actividad o pega el texto (p. ej. «PRA-ACT03: se terminaron las encuestas en sede E1»)`}
        value={r}
        onChange={(e) => i(e.target.value)}
      />
      <div className={`asis-fila`}>
        <button
          className={`primary`}
          disabled={!r.trim()}
          onClick={() => void u()}
        >{`Registrar`}</button>
        <button
          className={`btn`}
          onClick={async () => {
            let e = await window.ocr.openSubida();
            e && (await u(e));
          }}
        >{`Subir archivo…`}</button>
        {s && <small role={`status`}>{s}</small>}
      </div>
    </div>
  );
}
function ge() {
  let { cambios: e } = le(),
    [t, n] = useState([]),
    [r, i] = useState(``);
  useEffect(() => {
    let e = () => void window.ocr.call(`subidas`, {}).then(n);
    return (
      e(),
      window.addEventListener(`actualizaciones`, e),
      window.addEventListener(`proyecto`, e),
      () => {
        window.removeEventListener(`actualizaciones`, e),
          window.removeEventListener(`proyecto`, e);
      }
    );
  }, []);
  let a = e.filter((e) => !r || e.estado === r);
  return (
    <div className={`upd`}>
      <section className={`card`}>
        <h3>{`Subir actividad`}</h3>
        <p
          className={`muted`}
        >{`La IA lee lo que sube el equipo, lo clasifica en actividad y paso, marca avance y llena observaciones, bitácora y alertas. Todo se guarda solo en este equipo; el archivo original nunca se modifica.`}</p>
        {createElement(he, null)}
        <h3>{`Subidas recientes`}</h3>
        <table className={`tbl`}>
          <thead>
            <tr>
              <th>{`Fecha`}</th>
              <th>{`Tipo`}</th>
              <th>{`Nombre`}</th>
              <th>{`Leído por`}</th>
              <th>{`Cambios`}</th>
            </tr>
          </thead>
          <tbody>
            {t.map((e) => (
              <tr key={e.id}>
                <td>{de(e.fecha)}</td>
                <td>{e.tipo}</td>
                <td>{e.nombre}</td>
                <td>
                  {e.motor === `reglas-locales` ? `Reglas de la app` : `IA`}
                </td>
                <td>{e.cambios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={`card`}>
        {createElement(me, {
          cambios: e,
        })}
      </section>
      <section className={`card upd-hist`}>
        <h3>{`Historial de cambios`}</h3>
        <div className={`asis-fila`}>
          {[``, `aplicado`, `por_confirmar`, `deshecho`, `rechazado`].map(
            (e) => (
              <button
                className={r === e ? `chip on` : `chip`}
                onClick={() => i(e)}
                key={e}
              >
                {e ? e.replace(`_`, ` `) : `Todos`}
              </button>
            ),
          )}
        </div>
        {a.map((e) =>
          createElement(pe, {
            c: e,
            key: e.id,
          }),
        )}
      </section>
    </div>
  );
}
async function _e(e, t) {
  let n = await window.ocr.call(`list`, {
    table: `instrumentos`,
    activo: !0,
  });
  if (!n.length)
    throw Error(
      `No hay instrumento configurado. Revisa la configuración del cliente.`,
    );
  let r = await window.ocr.call(`crear_lote`, {
      instrumento_id: n[0].id,
    }),
    i = [];
  for (let n of e) {
    let e = n.split(/[\\/]/).pop() || n,
      a = await window.ocr.call(`registrar_pdf`, {
        lote_id: r.id,
        ruta: n,
      });
    if (a.duplicado) {
      i.push({
        nombre: e,
        paginas: 0,
        en_revision: 0,
        duplicado: !0,
      }),
        t?.([...i]);
      continue;
    }
    let o = await window.ocr.call(`procesar_documento`, {
      documento_id: a.id,
    });
    i.push({
      nombre: e,
      paginas: o.paginas ?? 0,
      en_revision: o.en_revision ?? 0,
      duplicado: !1,
      error: o.error,
    }),
      t?.([...i]);
  }
  let a = n[0].codigo ?? ``;
  return (
    ae({
      tipo: `lote`,
      nombre: `Lote ${r.id}`,
      texto: `Lote ${r.id} (formato ${a}) leído: ${e.length} archivo(s). ${i.map((e) => (e.duplicado ? `archivo repetido, no se volvió a cargar` : e.error || `${e.paginas} página(s), ${e.en_revision} por revisar`)).join(`; `)}`,
      ref: String(r.id),
      usuario: `usuario`,
    }).catch(() => void 0),
    {
      lote: r.id,
      instrumento: a,
      archivos: i,
    }
  );
}
function ve(e) {
  let t = e.archivos.map((e) =>
    e.duplicado
      ? `• ${e.nombre}: ya estaba importado (duplicado), no se volvió a leer`
      : e.error
        ? `• ${e.nombre}: no se pudo leer (${e.error})`
        : `• ${e.nombre}: ${e.paginas} página(s), ${e.en_revision} celda(s) a revisión`,
  );
  return (
    `Recibí ${e.archivos.length} archivo(s) en el lote ${e.lote}${e.instrumento ? ` (${e.instrumento})` : ``}:\n` +
    t.join(`
`) +
    `
No envío el PDF ni las respuestas a la IA: solo nombre, páginas y estado.`
  );
}
async function ye(e) {
  let t = [];
  for (let n of e)
    t.push(
      await window.ocr.call(`bandeja_subir`, {
        ruta: n,
      }),
    );
  return t;
}
function j(e) {
  return (
    `Guardé ${e.length} archivo(s) en la Bandeja de entrada:\n` +
    e.map((e) =>
      e.duplicado
        ? `• ${e.nombre}: ya estaba en la Bandeja, no se repitió`
        : `• ${e.nombre} (#${e.id}): ${e.caracteres ? `${e.caracteres} caracteres de texto leídos` : `sin texto legible`}` +
          (e.aviso ? ` — ${e.aviso}` : ``) +
          ` · ${e.estado === `propuesto` ? `clasificación propuesta` : `por confirmar`}`,
    ).join(`
`) +
    `
Puedes preguntarme qué dicen. No envío los archivos: solo el texto leído en tu equipo, sin datos personales.`
  );
}
var M = [
    [
      /(seguimiento|tablero|pendiente|bit[aá]cora|diario|calendario)/,
      `seguimiento`,
      `Seguimiento`,
    ],
    [/(avance|panel)/, `tablero`, `Panel de avance`],
    [/(importar|cargar|subir|pdf)/, `carga`, `Importar lote`],
    [/(cola|procesa)/, `cola`, `Cola de procesamiento`],
    [/(revisi|duda|aviso)/, `revision`, `Revisión`],
    [
      /(export|excel|xlsx|resultado)/,
      `exportacion`,
      `Resultados y exportación`,
    ],
    [/(usuario|rol)/, `usuarios`, `Usuarios y roles`],
    [/(personaliz|logo|color|marca)/, `personalizacion`, `Personalización`],
  ],
  N = `Puedo hacer esto aquí mismo, sin enviar nada fuera del equipo:
• «registra: PRA-ACT03 terminamos encuestas en sede E1» — actualiza Seguimiento
• «¿qué hay por confirmar?» — cambios de la IA que esperan tu visto bueno
• «¿cómo vamos?» — resumen del avance
• «llévame a revisión» (o importar, exportar, usuarios…)
• «¿qué está vencido?» — alertas del tablero
• «¿cómo funciona la revisión?»
Si activas un proveedor de IA en ⚙, las preguntas generales se le envían (sin datos de encuestas).`;
async function be(e, t, n = !1) {
  let r = e.toLowerCase();
  if (/^(ayuda|\?|qué puedes|que puedes)/.test(r)) return N;
  let i = e.match(/^\s*(registra|anota|avance|reporta)\s*:?\s*(.+)$/is);
  if (i) {
    let e = await ae({
      tipo: `diario`,
      nombre: `Chat del asistente`,
      texto: i[2],
      usuario: `usuario`,
    });
    return `Registrado. ${e.aplicados} cambio(s) aplicados en Seguimiento y ${e.por_confirmar} por confirmar (a la derecha). Todo se puede deshacer.`;
  }
  if (/^\s*(llévame|llevame|ir a|abre|abrir|ve a)\b/.test(r)) {
    let e = M.find(([e]) => e.test(r));
    if (e) return t(e[1]), `Listo, abrí «${e[2]}».`;
  }
  if (n) return null;
  if (/(por confirmar|pendientes de la ia|qué cambió|que cambio)/.test(r)) {
    let e = await window.ocr.call(`cambios`, {
      estado: `por_confirmar`,
    });
    return e.length
      ? `Hay ${e.length} cambio(s) por confirmar:\n` +
          e
            .slice(0, 8)
            .map((e) => `• ${e.actividad || `sin clasificar`}: ${e.texto}`)
            .join(`
`)
      : `No hay cambios por confirmar.`;
  }
  if (/(llév|llev|ir a|abre|abrir|ve a|muéstrame|muestrame)/.test(r)) {
    let e = M.find(([e]) => e.test(r));
    if (e) return t(e[1]), `Listo, abrí «${e[2]}».`;
  }
  if (/(cómo vamos|como vamos|resumen|avance|cuánt|cuant)/.test(r)) {
    let e = await window.ocr.call(`stats`),
      t = (await window.ocr.call(`tablero`, {})).kpis;
    return `Resumen (calculado en tu equipo):\n• ${e.lotes} lote(s), ${e.paginas} página(s) leídas\n• ${t.por_revisar ?? 0} celda(s) esperan revisión humana\n• Cobertura: ${t.pct_cobertura ?? `—`} % de la muestra (${t.aplicadas}/${t.muestra})\n• Avance de actividades: ${t.avance_actividades ?? `—`} %`;
  }
  if (/(vencid|alerta|atrasad|próxim|proxim)/.test(r)) {
    let e = await window.ocr.call(`tablero`, {}),
      t = e.alertas.vencidas.map(
        (e) => `• Vencida: ${e.codigo} ${e.nombre} (${e.fin})`,
      ),
      n = e.alertas.proximas.map(
        (e) => `• Próxima: ${e.codigo} ${e.nombre} (${e.fin})`,
      );
    return t.length + n.length
      ? [...t, ...n].join(`
`)
      : `No hay actividades vencidas ni próximas.`;
  }
  return /(revisi|duda|no se invent|vac[ií]o)/.test(r)
    ? `Regla de la app: no se inventa ningún dato. Si una casilla tiene marca tenue, doble marca o borrón, la celda queda vacía y pasa a «Revisión». Ahí comparas con la imagen y decides; cada cambio queda en la bitácora.`
    : /^(hola|buenas|hey)/.test(r)
      ? `¡Hola! ¿En qué te ayudo? Escribe «ayuda» para ver lo que puedo hacer.`
      : null;
}
var P = 0;
function xe(e, t) {
  let n = e.proveedores.find((t) => t.id === e.proveedor)?.nombre ?? `la IA`,
    r = (e.sesion ?? []).includes(e.proveedor) || e.tieneLlave;
  return t === `consentimiento`
    ? `Para usar ${n} falta aceptar el aviso de datos. Abre ⚙ IA del proyecto, marca «Acepto» y guarda.`
    : t === `modelo`
      ? `Falta elegir el modelo de ${n}. Abre ⚙ IA del proyecto, elige un modelo y guarda.`
      : r
        ? `Ya iniciaste sesión con ${n}, pero la IA aún no está activada para este proyecto. Abre ⚙ IA del proyecto, marca «Activar IA» y «Acepto el aviso», y guarda. Mientras tanto respondo solo con lo que calculo en tu equipo (escribe «ayuda»).`
        : `La IA no está activada para este proyecto. Abre ⚙ IA del proyecto para elegir un proveedor (por ejemplo, «Iniciar sesión con Grok») y activarla. Mientras tanto respondo solo con lo que calculo en tu equipo (escribe «ayuda»).`;
}
var F = [
  `¿Cómo vamos?`,
  `¿Qué está vencido?`,
  `¿Qué hay por confirmar?`,
  `registra: `,
  `Llévame a Seguimiento`,
  `Ayuda`,
];
function PantallaAsistente({ ir: e }) {
  let [t, n] = useState(!1),
    [r, i] = useState(null),
    [a, o] = useState([]),
    [s, c] = useState(null),
    [u, d] = useState([]),
    [f, m] = useState(!1),
    h = useRef(!1),
    [g, _] = useState(``),
    [v, y] = useState(!1),
    [b, x] = useState(null),
    [S, C] = useState(null);
  useEffect(
    () =>
      window.ocr.asistente.alCodigoXai((e) => {
        C(e), e && x(null);
      }),
    [],
  );
  let [w, T] = useState([]),
    [E, D] = useState(null),
    [O, k] = useState({
      proveedor: `ollama`,
      base: ``,
      borrarLlave: !1,
      modelo: ``,
      llave: ``,
      consentimiento: !1,
      habilitado: !1,
    }),
    ee = useRef(null),
    te = useRef(null),
    { cambios: ne } = le(),
    [A, re] = useState(``),
    ie = (e, t, n) =>
      o((r) =>
        r.map((r) =>
          r.propuesta?.id === e
            ? {
                ...r,
                estado: t,
                ...(n
                  ? {
                      texto: n,
                    }
                  : {}),
              }
            : r,
        ),
      );
  async function oe(e) {
    ie(e.id, `aplicando`);
    try {
      let t = await window.ocr.asistente.aplicar(e.id);
      ie(e.id, t.ok ? `hecha` : `error`, t.mensaje),
        t.deshacer &&
          o((e) => [
            ...e,
            {
              rol: `local`,
              texto: ``,
              propuesta: t.deshacer,
              estado: `pendiente`,
            },
          ]),
        t.ok && window.dispatchEvent(new Event(`seguimiento-cambio`));
    } catch (t) {
      ie(e.id, `error`, String(t).replace(/^Error: /, ``));
    }
  }
  async function se(e) {
    await window.ocr.asistente.cancelar(e.id),
      ie(
        e.id,
        `cancelada`,
        e.deshace ? `Se mantiene el cambio.` : `Cancelado: no se cambió nada.`,
      );
  }
  async function ce() {
    let e = await window.ocr.openExcel();
    if (!e) return;
    re(e);
    let t = e.split(/[\\/]/).pop(),
      n = [
        ...a,
        {
          rol: `yo`,
          texto: `📊 Adjunté el Excel «${t}»`,
          contexto: !0,
        },
      ];
    o(n), y(!0);
    try {
      let t = await window.ocr.asistente.proponer(
        `importar_excel_seguimiento`,
        {},
        e,
      );
      o([
        ...n,
        `error` in t
          ? {
              rol: `local`,
              texto: `No se pudo leer el Excel: ${t.error}`,
            }
          : {
              rol: `local`,
              texto: ``,
              propuesta: t,
              estado: `pendiente`,
            },
      ]);
    } catch (e) {
      o([
        ...n,
        {
          rol: `local`,
          texto: `No se pudo leer el Excel: ${e.message}`,
        },
      ]);
    } finally {
      y(!1);
    }
  }
  let ue = (e) => {
    i(e),
      k({
        proveedor: e.proveedor,
        base: e.base,
        borrarLlave: !1,
        modelo: e.modelo,
        llave: ``,
        consentimiento: e.consentimiento,
        habilitado: e.habilitado,
      });
  };
  useEffect(() => {
    let e = () =>
      void window.ocr.asistente
        .config()
        .then((e) => ue(e))
        .catch(() => void 0);
    return (
      e(),
      window.addEventListener(`proyecto`, e),
      () => window.removeEventListener(`proyecto`, e)
    );
  }, []);
  async function de() {
    let e = (await window.ocr.call(`chat_listar`).catch(() => [])) ?? [];
    return d(e), e;
  }
  async function fe(e) {
    if (((h.current = !1), e === null)) c(null), o([]);
    else {
      let t = await window.ocr.call(`chat_leer`, {
        id: e,
      });
      o(
        t.turnos.map((e) =>
          e.propuesta && (e.estado === `pendiente` || e.estado === `aplicando`)
            ? {
                ...e,
                estado: `cancelada`,
                texto: `Sin aplicar (la propuesta caducó).`,
              }
            : e,
        ),
      ),
        c(e);
    }
    m(!1), setTimeout(() => (h.current = !0), 0);
  }
  useEffect(() => {
    let e = () => void de().then((e) => fe(e[0]?.id ?? null));
    return (
      e(),
      window.addEventListener(`proyecto`, e),
      () => window.removeEventListener(`proyecto`, e)
    );
  }, []),
    useEffect(() => {
      if (!h.current || !a.length) return;
      let e = setTimeout(async () => {
        let e = s;
        e === null && ((e = (await window.ocr.call(`chat_crear`)).id), c(e)),
          await window.ocr.call(`chat_guardar`, {
            id: e,
            turnos: a,
          }),
          de();
      }, 300);
      return () => clearTimeout(e);
    }, [a]);
  async function pe(e) {
    if (!window.confirm(`¿Borrar esta conversación de la lista?`)) return;
    await window.ocr.call(`chat_borrar`, {
      id: e,
    });
    let t = await de();
    e === s && (await fe(t[0]?.id ?? null));
  }
  useEffect(() => {
    ee.current?.scrollIntoView({
      block: `end`,
    });
  }, [a]);
  async function he(t) {
    let n = (t ?? g).trim();
    if (!n || v) return;
    _(``);
    let r = [
      ...a,
      {
        rol: `yo`,
        texto: n,
      },
    ];
    o(r), y(!0);
    try {
      let t = await window.ocr.asistente.config();
      i(t);
      let a = await be(n, e, t.habilitado);
      if (a)
        o([
          ...r,
          {
            rol: `local`,
            texto: a,
          },
        ]);
      else if (t.habilitado) {
        let n = r
            .filter((e) => (e.rol !== `local` || e.contexto) && !e.propuesta)
            .map((e) => ({
              rol: e.rol === `local` ? `ia` : e.rol,
              texto: e.texto,
            })),
          i = await window.ocr.asistente.preguntar(n, {
            adjunto: A,
            chat: s ?? void 0,
          });
        i.navegar && e(i.navegar),
          o([
            ...r,
            i.ok
              ? {
                  rol: `ia`,
                  texto: i.texto || `(sin respuesta)`,
                }
              : i.necesita
                ? {
                    rol: `local`,
                    texto: xe(t, i.necesita),
                    accion: `ajustes`,
                  }
                : {
                    rol: `local`,
                    texto: i.error ?? `Error`,
                  },
            ...(i.propuestas ?? []).map((e) => ({
              rol: `local`,
              texto: ``,
              propuesta: e,
              estado: `pendiente`,
            })),
          ]);
      } else
        o([
          ...r,
          {
            rol: `local`,
            texto: xe(t, `activar`),
            accion: `ajustes`,
          },
        ]);
    } catch (e) {
      o([
        ...r,
        {
          rol: `local`,
          texto: String(e),
        },
      ]);
    } finally {
      y(!1);
    }
  }
  async function ge() {
    let e = await window.ocr.openArchivos();
    if (!e.length) return;
    let t = e.map((e) => e.split(/[\\/]/).pop()).join(`, `),
      n = [
        ...a,
        {
          rol: `yo`,
          texto: `📎 Subí ${e.length} archivo(s): ${t}`,
        },
      ];
    o([...n]), y(!0);
    try {
      let t = [j(await ye(e))],
        r = e.filter((e) => /\.pdf$/i.test(e));
      if (r.length)
        try {
          t.push(ve(await _e(r)));
        } catch {}
      o([
        ...n,
        {
          rol: `local`,
          texto: t.join(`

`),
          contexto: !0,
        },
      ]);
    } catch (e) {
      o([
        ...n,
        {
          rol: `local`,
          texto: `No se pudo importar: ${e.message}`,
        },
      ]);
    } finally {
      y(!1);
    }
  }
  async function M() {
    let e = r?.proveedores.find((e) => e.id === O.proveedor)?.local,
      t = await window.ocr.asistente.guardar({
        proveedor: O.proveedor,
        base: O.base,
        borrarLlave: O.borrarLlave,
        modelo: O.modelo,
        consentimiento: O.consentimiento,
        habilitado: O.habilitado && (e || O.consentimiento),
        ...(O.llave && O.proveedor === `hermes`
          ? {
              llave: O.llave,
            }
          : {}),
      });
    ue(t), n(!1);
  }
  let N = r?.proveedores.find((e) => e.id === O.proveedor),
    I = !!r?.conLlave.includes(O.proveedor) && !O.borrarLlave,
    Se = !!r?.sesion?.includes(O.proveedor),
    Ce = () => ({
      proveedor: O.proveedor,
      base: O.base,
      modelo: O.modelo,
      ...(O.llave && O.proveedor === `hermes`
        ? {
            llave: O.llave,
          }
        : {}),
    });
  async function we() {
    let e = await window.ocr.asistente.modelos(Ce());
    T(e.modelos),
      x(
        e.ok
          ? {
              ok: !0,
              mensaje: `${e.modelos.length} modelos`,
            }
          : {
              ok: !1,
              mensaje: e.error ?? ``,
            },
      );
  }
  async function Te() {
    x({
      ok: !0,
      mensaje: `Probando…`,
    });
    let e = await window.ocr.asistente.probar(Ce());
    e.modelos.length && T(e.modelos);
    let t = /fetch failed|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|network/i.test(
      e.mensaje,
    );
    x({
      ok: e.ok,
      mensaje:
        !e.ok && t
          ? `No se encontró esa IA. Si es de este equipo, revisa que el programa esté abierto; si es externa, revisa tu conexión a internet.`
          : e.mensaje,
    });
  }
  async function Ee() {
    D(null), D(await window.ocr.asistente.detectarLocales());
  }
  async function De(e = O.proveedor) {
    x({
      ok: !0,
      mensaje:
        e === `xai`
          ? `Pidiendo un código a xAI…`
          : `Abriendo el navegador para iniciar sesión…`,
    });
    let t = await window.ocr.asistente.iniciarSesion(e);
    t.ok && t.config
      ? (i(t.config),
        x({
          ok: !0,
          mensaje: `Sesión iniciada. Quedó guardada de forma segura en este equipo.`,
        }))
      : x({
          ok: !1,
          mensaje: t.error ?? `No se pudo iniciar sesión`,
        });
  }
  async function Oe() {
    i(await window.ocr.asistente.cerrarSesion(O.proveedor)),
      x({
        ok: !0,
        mensaje: `Sesión cerrada y borrada de este equipo.`,
      });
  }
  let ke =
      r?.proveedores.find((e) => e.id === r.proveedor)?.nombre ?? r?.proveedor,
    Ae = r?.proveedores.find((e) => e.id === r?.proveedor)?.local;
  return (
    <main className={`chat-page`} aria-label={`Asistente`}>
      <section className={`chat`}>
        <header className={`chat-cab`}>
          <div>
            <h2>{`Asistente`}</h2>
            <small className={r?.habilitado ? `estado on` : `estado`}>
              {r?.habilitado
                ? `${Ae ? `IA local` : `IA externa`} · ${ke} · ${r.modelo}`
                : `IA apagada · respondo con lo que calcula la app`}
            </small>
          </div>
          <span className={`asis-fila`}>
            <button
              className={`btn`}
              onClick={() => void fe(null)}
              aria-label={`Conversación nueva`}
            >{`＋ Nueva`}</button>
            <button
              className={`btn`}
              onClick={() => m(!f)}
              aria-label={`Conversaciones`}
            >
              {`🕘 Conversaciones (`}
              {u.length}
              {`)`}
            </button>
            <button
              className={`btn`}
              onClick={() => n(!t)}
              aria-label={`IA del proyecto`}
            >{`⚙ IA del proyecto`}</button>
          </span>
        </header>
        {f && (
          <ul className={`chat-lista`} aria-label={`Lista de conversaciones`}>
            {u.length === 0 && (
              <li
                className={`muted`}
              >{`Aún no hay conversaciones guardadas.`}</li>
            )}
            {u.map((e) => (
              <li className={e.id === s ? `on` : ``} key={e.id}>
                <button className={`link`} onClick={() => void fe(e.id)}>
                  {e.titulo}
                </button>
                <small className={`muted`}>
                  {` `}
                  {`· `}
                  {e.n}
                  {` mensajes · `}
                  {e.actualizado.slice(0, 16)}
                </small>
                <button
                  className={`link peligro`}
                  aria-label={`Borrar ${e.titulo}`}
                  onClick={() => void pe(e.id)}
                >{`Borrar`}</button>
              </li>
            ))}
          </ul>
        )}
        {t ? (
          <div className={`chat-body asis-ajustes`}>
            <div className={`aviso`}>
              <b>{`Privacidad`}</b>
              <ul>
                <li>
                  <b>{`Recomendado: modelo local`}</b>
                  {` (Ollama, LM Studio, llama.cpp). Nada sale del equipo.`}
                </li>
                <li>{`Proveedor externo: solo con tu consentimiento; se tachan correos, teléfonos, CURP y folios. Nunca se envían PDF, imágenes ni respuestas de encuestas.`}</li>
                <li>{`Solo se inicia sesión con tu cuenta; nunca se pegan llaves. La sesión se guarda protegida, por proyecto, solo en este equipo.`}</li>
                <li>{`Las actualizaciones de la IA se guardan solo en la base local; la fuente del tablero no se toca.`}</li>
              </ul>
            </div>
            <div className={`asis-fila`}>
              <button
                type={`button`}
                className={`btn`}
                onClick={() => void Ee()}
              >{`Buscar IA instalada en este equipo`}</button>
              {E && !E.length && (
                <small
                  className={`muted`}
                >{`No se encontró ninguno en este equipo.`}</small>
              )}
            </div>
            {E?.map((e) => (
              <div className={`asis-fila`} key={e.id}>
                <span>
                  {`✅ `}
                  {e.nombre}
                  {` · `}
                  {e.modelos.length}
                  {` modelo(s)`}
                  {e.falta && (
                    <small className={`muted`}>
                      {` · `}
                      {e.falta}
                    </small>
                  )}
                </span>
                <button
                  type={`button`}
                  className={`btn`}
                  onClick={() => {
                    k({
                      ...O,
                      proveedor: e.id,
                      base: e.base,
                      modelo: e.modelos[0] ?? ``,
                      habilitado: !0,
                    }),
                      T(e.modelos);
                  }}
                >{`Usar`}</button>
              </div>
            ))}
            <label>
              {`¿Qué IA quieres usar?`}
              <select
                value={O.proveedor}
                onChange={(e) => {
                  let t = r?.proveedores.find((t) => t.id === e.target.value);
                  k({
                    ...O,
                    proveedor: e.target.value,
                    base: t?.base ?? ``,
                    modelo: t?.sugeridos?.[0] ?? ``,
                    llave: ``,
                    borrarLlave: !1,
                  }),
                    T(t?.sugeridos ?? []),
                    x(null);
                }}
              >
                {r?.proveedores.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.nombre}
                    {e.local ? ` (recomendado)` : ``}
                  </option>
                ))}
              </select>
            </label>
            <>
              <label>
                {`Modelo`}
                <span className={`asis-fila`}>
                  <input
                    list={`asis-modelos`}
                    value={O.modelo}
                    onChange={(e) =>
                      k({
                        ...O,
                        modelo: e.target.value,
                      })
                    }
                  />
                  <button
                    type={`button`}
                    className={`btn`}
                    onClick={() => void we()}
                  >{`Ver modelos`}</button>
                </span>
                <datalist id={`asis-modelos`}>
                  {w.map((e) => (
                    <option value={e} key={e} />
                  ))}
                </datalist>
              </label>
              {N?.local ? (
                <p
                  className={`muted`}
                >{`Funciona en este equipo: sin iniciar sesión; nada sale.`}</p>
              ) : N?.acceso === `hermes-local` ? (
                <p className={`muted`}>
                  {`Hermes corre en este equipo y usa la cuenta de xAI con la que iniciaste sesión dentro de Hermes. `}
                  {I ? `✓ Listo para conectarse.` : ``}
                </p>
              ) : (
                N?.acceso && (
                  <div className={`asis-fila`}>
                    {Se ? (
                      <>
                        <span className={`ok`}>{`✓ Sesión iniciada`}</span>
                        <button
                          type={`button`}
                          className={`btn`}
                          onClick={() => void Oe()}
                        >{`Cerrar sesión`}</button>
                      </>
                    ) : N.acceso === `google-oauth` && !r?.googleConfigurado ? (
                      <small
                        className={`muted`}
                      >{`Aún no configurado: falta registrar la app de Google para iniciar sesión. Pide a soporte que la active.`}</small>
                    ) : N.acceso === `xai-device` && S ? (
                      <div className={`asis-codigo`} role={`status`}>
                        <p>
                          {`1. Pulsa el botón para abrir x.ai e inicia sesión con tu cuenta de Grok.`}
                          <br />
                          {`2. Comprueba que aparezca este código y aprueba el acceso:`}
                        </p>
                        <strong className={`asis-codigo-num`}>
                          {S.codigo}
                        </strong>
                        <div className={`asis-fila`}>
                          <button
                            type={`button`}
                            className={`primary`}
                            onClick={() => void window.ocr.asistente.abrirXai()}
                          >{`Abrir aprobación en x.ai`}</button>
                          <button
                            type={`button`}
                            className={`btn`}
                            onClick={() =>
                              void window.ocr.asistente.cancelarXai()
                            }
                          >{`Cancelar`}</button>
                        </div>
                        <small className={`muted`}>
                          {`Esperando tu aprobación… El código vence a las`}
                          {` `}
                          {new Date(S.expira).toLocaleTimeString([], {
                            hour: `2-digit`,
                            minute: `2-digit`,
                          })}
                          {`.`}
                        </small>
                      </div>
                    ) : (
                      <button
                        type={`button`}
                        className={`primary`}
                        onClick={() => void De()}
                      >
                        {N.acceso === `xai-device`
                          ? `Iniciar sesión con Grok (xAI)`
                          : `Iniciar sesión con ${N.nombre.replace(/ \(iniciar sesión\)$/, ``)}`}
                      </button>
                    )}
                  </div>
                )
              )}
              <details className={`avanzado`}>
                <summary>{`Avanzado (para soporte técnico)`}</summary>
                <label>
                  {`Dirección del servicio`}
                  <input
                    value={O.base}
                    onChange={(e) =>
                      k({
                        ...O,
                        base: e.target.value,
                      })
                    }
                  />
                </label>
                {N?.acceso === `hermes-local` && (
                  <label>
                    {`Clave del servidor de Hermes `}
                    {I ? `(guardada)` : ``}
                    <span className={`asis-fila`}>
                      <input
                        type={`password`}
                        value={O.llave}
                        autoComplete={`off`}
                        onChange={(e) =>
                          k({
                            ...O,
                            llave: e.target.value,
                          })
                        }
                      />
                      {I && (
                        <button
                          type={`button`}
                          className={`btn`}
                          onClick={() =>
                            k({
                              ...O,
                              llave: ``,
                              borrarLlave: !0,
                            })
                          }
                        >{`Borrar`}</button>
                      )}
                    </span>
                    <small
                      className={`muted`}
                    >{`La misma que pusiste en Hermes (API_SERVER_KEY). No es una llave de xAI.`}</small>
                  </label>
                )}
              </details>
            </>
            <div className={`asis-fila`}>
              <button
                type={`button`}
                className={`btn`}
                onClick={() => void Te()}
              >{`Probar conexión`}</button>
              {b && (
                <small className={b.ok ? `ok` : `error`} role={`status`}>
                  {b.mensaje}
                </small>
              )}
            </div>
            {!N?.local && (
              <label className={`check`}>
                <input
                  type={`checkbox`}
                  checked={O.consentimiento}
                  onChange={(e) =>
                    k({
                      ...O,
                      consentimiento: e.target.checked,
                      habilitado: e.target.checked && O.habilitado,
                    })
                  }
                />
                {`Entiendo qué se envía y mi organización autoriza este proveedor externo.`}
              </label>
            )}
            <label className={`check`}>
              <input
                type={`checkbox`}
                disabled={!N?.local && !O.consentimiento}
                checked={O.habilitado}
                onChange={(e) =>
                  k({
                    ...O,
                    habilitado: e.target.checked,
                  })
                }
              />
              {`Activar IA para este proyecto`}
            </label>
            <div className={`actions`}>
              <button
                className={`primary`}
                onClick={() => void M()}
              >{`Guardar`}</button>
              <button
                className={`btn`}
                onClick={() => n(!1)}
              >{`Cancelar`}</button>
            </div>
          </div>
        ) : (
          <>
            <div className={`chat-body`}>
              {a.length === 0 && (
                <div className={`chat-hola`}>
                  <div className={`chat-avatar`}>{`💬`}</div>
                  <h1>{`¡Hola! ¿Qué hacemos hoy?`}</h1>
                  <p
                    className={`muted`}
                  >{`Cuéntame qué hizo el equipo y actualizo Seguimiento solo. Lo que no esté claro queda «por confirmar» a la derecha.`}</p>
                </div>
              )}
              {a.map((e, t) =>
                e.propuesta ? (
                  createElement(TarjetaPropuesta, {
                    p: e.propuesta,
                    estado: e.estado ?? `pendiente`,
                    nota: e.texto,
                    aplicar: () => void oe(e.propuesta),
                    cancelar: () => void se(e.propuesta),
                    key: t,
                  })
                ) : (
                  <div className={`msg ${e.rol}`} key={t}>
                    {e.rol === `ia` && <em className={`tag`}>{`IA`}</em>}
                    {e.texto}
                    {e.accion === `ajustes` && (
                      <div>
                        <button
                          className={`primary`}
                          onClick={() => n(!0)}
                        >{`⚙ Abrir ajustes de IA`}</button>
                      </div>
                    )}
                  </div>
                ),
              )}
              {v && <div className={`msg local muted`}>{`Pensando…`}</div>}
              <div ref={ee} />
            </div>
            <div className={`chips`}>
              {r?.demo && (
                <button
                  className={`chip demo`}
                  onClick={async () => {
                    let e = r.simulaciones ?? [];
                    if (!e.length) return;
                    let [t, n, i] = e[P++ % e.length],
                      a = await ae({
                        tipo: t,
                        nombre: n,
                        texto: i,
                        usuario: `Persona E (ficticia)`,
                      });
                    o((e) => [
                      ...e,
                      {
                        rol: `yo`,
                        texto: `🎬 Simulación: el equipo subió «${n}» — ${i}`,
                      },
                      {
                        rol: `local`,
                        texto: `Seguimiento actualizado: ${a.aplicados} cambio(s) aplicados, ${a.por_confirmar} por confirmar.`,
                      },
                    ]);
                  }}
                >{`🎬 Simular subida del equipo`}</button>
              )}
              {F.map((e) => (
                <button
                  className={`chip`}
                  onClick={() => {
                    e.endsWith(`: `) ? (_(e), te.current?.focus()) : he(e);
                  }}
                  key={e}
                >
                  {e === `registra: ` ? `📝 Registrar avance…` : e}
                </button>
              ))}
            </div>
            <form
              className={`chat-input`}
              onSubmit={(e) => {
                e.preventDefault(), he();
              }}
            >
              <textarea
                ref={te}
                rows={2}
                value={g}
                placeholder={`Escribe… (no incluyas datos de personas)`}
                onChange={(e) => _(e.target.value)}
                onKeyDown={(e) => {
                  e.key === `Enter` &&
                    !e.shiftKey &&
                    (e.preventDefault(), he());
                }}
              />
              <button
                type={`button`}
                title={`Importa PDF de encuestas escaneadas (quedan en tu equipo)`}
                disabled={v}
                onClick={() => void ge()}
              >{`📎 Subir archivo…`}</button>
              <button
                type={`button`}
                title={`Adjunta un Excel o CSV con el avance para traerlo a Seguimiento`}
                disabled={v}
                onClick={() => void ce()}
              >{`📊 Adjuntar Excel`}</button>
              <button
                className={`primary`}
                disabled={v || !g.trim()}
              >{`Enviar`}</button>
            </form>
          </>
        )}
      </section>
      <aside className={`chat-lado`}>
        <div className={`card`}>
          <b>{`¿Tienes un archivo?`}</b>
          <p
            className={`muted`}
          >{`Usa 📎 junto al mensaje para adjuntar un PDF o documento. Lo leo en este equipo y nunca envío el archivo a la IA.`}</p>
        </div>
        {createElement(me, {
          cambios: ne,
        })}
      </aside>
    </main>
  );
}
function TarjetaPropuesta({
  p: e,
  estado: t,
  nota: n,
  aplicar: r,
  cancelar: i,
}) {
  return (
    <div className={`accion-ia ${t}`} role={`group`} aria-label={e.titulo}>
      <div className={`accion-tit`}>
        {e.deshace ? `↩️` : `✋`}
        {` `}
        {e.titulo}
      </div>
      {!!e.lineas.length && (
        <ul>
          {e.lineas.map((e, t) => (
            <li key={t}>{e}</li>
          ))}
        </ul>
      )}
      {t === `pendiente` || t === `aplicando` ? (
        <>
          <small className={`muted`}>
            {e.deshace
              ? `¿Quieres deshacer este cambio?`
              : `Nada cambia hasta que pulses «Aplicar». Solo se guarda en este equipo.`}
          </small>
          <div className={`actions`}>
            <button
              className={`btn primary`}
              disabled={t === `aplicando`}
              onClick={r}
            >
              {e.deshace ? `Deshacer` : `Aplicar`}
            </button>
            <button className={`btn`} disabled={t === `aplicando`} onClick={i}>
              {e.deshace ? `Mantener` : `Cancelar`}
            </button>
          </div>
        </>
      ) : (
        <small className={t === `error` ? `error` : `muted`}>
          {t === `hecha` ? `✅ ` : ``}
          {n}
        </small>
      )}
    </div>
  );
}
function Se() {
  let [e, t] = useState([]),
    [n, r] = useState(``),
    i = (e, n, r = ``) =>
      t((t) =>
        t.map((t) =>
          t.p.id === e
            ? {
                ...t,
                estado: n,
                nota: r,
              }
            : t,
        ),
      );
  async function a(e, n = {}) {
    r(``);
    let i = await window.ocr.asistente.proponer(e, n);
    if (i.error) return r(i.error);
    t((e) => [
      ...e,
      {
        p: i,
        estado: `pendiente`,
        nota: ``,
      },
    ]);
  }
  async function o(e) {
    i(e.id, `aplicando`);
    try {
      let n = await window.ocr.asistente.aplicar(e.id);
      if (
        (i(e.id, `hecha`, e.deshace ? `Deshecho.` : `Aplicado.`), n.deshacer)
      ) {
        let e = n.deshacer;
        t((t) => [
          ...t,
          {
            p: e,
            estado: `pendiente`,
            nota: ``,
          },
        ]);
      }
    } catch (t) {
      i(e.id, `error`, String(t).replace(/^Error:\s*/, ``));
    }
  }
  async function s(e) {
    await window.ocr.asistente.cancelar(e.id),
      i(
        e.id,
        `cancelada`,
        e.deshace ? `Se mantiene el cambio.` : `Cancelado: no cambió nada.`,
      );
  }
  return {
    pedir: a,
    tarjetas: e.length ? (
      <div className={`v5-props`}>
        {e.map((e) =>
          createElement(TarjetaPropuesta, {
            p: e.p,
            estado: e.estado,
            nota: e.nota,
            aplicar: () => void o(e.p),
            cancelar: () => void s(e.p),
            key: e.p.id,
          }),
        )}
      </div>
    ) : null,
    aviso: n,
  };
}
function Pista({ texto: e }) {
  return (
    <span
      className={`v5-tip chico`}
      tabIndex={0}
      role={`note`}
      aria-label={e}
      data-tip={e}
    >{`?`}</span>
  );
}
function we(e, t) {
  return e.en_revision
    ? [`Revisar ${e.en_revision}`, `p-w`]
    : e.estado === `faltan`
      ? [`Faltan ${-(e.diferencia ?? 0)}`, `p-e`]
      : e.estado === `sobran`
        ? [`Sobran ${e.diferencia}`, `p-e`]
        : t.has(e.lote_id)
          ? [`Exportado`, `p-ok`]
          : e.leidas
            ? [`Listo para exportar`, `p-a`]
            : [`Sin empezar`, ``];
}
function PantallaTablero({ stats: e, ir: t }) {
  let [n, r] = useState(null),
    [i, a] = useState([]),
    [o, s] = useState(``),
    [c, u] = useState(null),
    [d, f] = useState(``),
    m = Se(),
    h = async () => {
      r(await window.ocr.call(`control_conciliar`).catch(() => null)),
        a(
          (await window.ocr
            .call(`list`, {
              table: `exportaciones`,
            })
            .catch(() => [])) ?? [],
        );
    };
  useEffect(() => {
    h();
  }, [e]);
  let g = new Set(i.map((e) => Number(e.lote_id))),
    _ = n?.lotes ?? [],
    v = e?.en_revision ?? 0,
    y = _.filter((e) => e.leidas && !e.en_revision && !g.has(e.lote_id)),
    b = n?.totales.esperado ?? 0,
    x = n?.totales.leidas ?? 0,
    S = _.filter((e) => e.leidas && !e.en_revision).length,
    w = i.length ? String(i[i.length - 1].fecha ?? ``).slice(0, 16) : ``,
    T = v
      ? [
          `tienes ${v} marca(s) dudosa(s) por revisar.`,
          `Tardarás unos ${Math.max(1, Math.round(v / 3))} minuto(s).`,
          `Ir a revisar →`,
          `revision`,
        ]
      : y.length
        ? [
            `el lote ${y[0].lote_id} está revisado y listo para exportar.`,
            `Lo que no se pudo leer sale vacío, nunca como 0.`,
            `Ir a exportar →`,
            `exportacion`,
          ]
        : [
            _.length
              ? `todo está al día. Sube el siguiente lote cuando lo tengas.`
              : `sube tu primer lote de encuestas.`,
            `Arrastra los PDF escaneados; Lector lee las casillas.`,
            `Subir encuestas →`,
            `carga`,
          ];
  async function E(e) {
    await window.ocr.call(`control_esperado`, {
      lote_id: e,
      esperado: d.trim() === `` ? null : Number(d),
      fuente: `lista de aplicación`,
    }),
      u(null),
      await h();
  }
  return (
    <section className={`stage pad v5-main`} aria-label={`Panel de avance`}>
      <header className={`v5-hd`}>
        <div>
          <h1>{tr(`Panel de avance`)}</h1>
          <p className={`sub`}>{`Cuánto llevamos y qué sigue.`}</p>
        </div>
        <button className={`btn primary`} onClick={() => t(`carga`)}>
          {`+ `}
          {tr(`Subir lote de encuestas`)}
        </button>
      </header>
      <div className={`v5-banner`} role={`status`}>
        <span className={`v5-banner-ic`}>{`✓`}</span>
        <div>
          <b>
            {tr(`Siguiente paso`)}
            {`: `}
            {T[0]}
          </b>
          <small>{T[1]}</small>
        </div>
        <button className={`btn`} onClick={() => t(T[3])}>
          {tr(T[2])}
        </button>
      </div>
      <div className={`v5-kpis`}>
        <div className={`card v5-kpi`}>
          <em>
            {tr(`Encuestas capturadas`)}
            {` `}
            {createElement(Pista, {
              texto: `Hojas leídas en todos los lotes del proyecto.`,
            })}
          </em>
          <b>{x}</b>
          <div className={`v5-bar`}>
            <i
              style={{
                width: `${b ? Math.min(100, (100 * x) / b) : 0}%`,
              }}
            />
          </div>
          <small>
            {b
              ? `de ${b} esperadas · ${Math.round((100 * x) / b)} %`
              : `sin meta: fíjala por lote abajo`}
          </small>
        </div>
        <div className={`card v5-kpi`}>
          <em>
            {tr(`Lotes`)}
            {` `}
            {createElement(Pista, {
              texto: `Lotes leídos y sin marcas pendientes, del total.`,
            })}
          </em>
          <b>
            {S}
            {` de `}
            {_.length}
          </b>
          <div className={`v5-bar`}>
            <i
              style={{
                width: `${_.length ? (100 * S) / _.length : 0}%`,
              }}
            />
          </div>
          <small>
            {n
              ? `${n.totales.cuadran} cuadran con la lista · ${n.totales.con_diferencia} con diferencia`
              : ``}
          </small>
        </div>
        <div className={`card v5-kpi`}>
          <em>
            {tr(`Por revisar`)}
            {` `}
            {createElement(Pista, {
              texto: `Marcas que Lector no vio claras; quedan vacías hasta que alguien decida.`,
            })}
          </em>
          <b>{v}</b>
          <div className={`v5-bar`}>
            <i
              style={{
                width: `${Math.min(100, v)}%`,
              }}
            />
          </div>
          <small>{`marcas dudosas`}</small>
        </div>
        <div className={`card v5-kpi`}>
          <em>
            {tr(`Exportaciones`)}
            {` `}
            {createElement(Pista, {
              texto: `Archivos de resultados generados.`,
            })}
          </em>
          <b>{i.length}</b>
          <div className={`v5-bar`}>
            <i
              style={{
                width: `${_.length ? (100 * g.size) / _.length : 0}%`,
              }}
            />
          </div>
          <small>{w ? `última ${w}` : `aún ninguna`}</small>
        </div>
      </div>
      <div className={`card v5-tabla`}>
        <div className={`v5-hd`}>
          <b>
            {`Por lote · conciliación`}
            {` `}
            {createElement(Pista, {
              texto: `Compara las hojas esperadas (lista de aplicación) con las leídas. Escribe el número esperado de cada lote.`,
            })}
          </b>
          <small className={`muted`}>{`Esperadas contra leídas`}</small>
        </div>
        {_.length === 0 ? (
          <div className={`v5-vacio`}>
            <b>{`Aún no hay lotes`}</b>
            {`Sube encuestas escaneadas y aquí verás cuánto llevas de cada plantel.`}
            <button
              className={`btn`}
              onClick={() => t(`carga`)}
            >{`Subir lote`}</button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>{`Lote`}</th>
                <th>{`Avance`}</th>
                <th>{`Encuestas`}</th>
                <th>{`Estado`}</th>
              </tr>
            </thead>
            <tbody>
              {_.map((e) => {
                let [t, n] = we(e, g),
                  r = e.esperado
                    ? (100 * e.leidas) / e.esperado
                    : e.leidas
                      ? 100
                      : 0;
                return (
                  <tr key={e.lote_id}>
                    <td>
                      <b>
                        {e.unidad ? `${e.unidad} · ` : ``}
                        {e.unidad_nombre ?? `Lote ${e.lote_id}`}
                      </b>
                      <small className={`muted`}>
                        {` · lote `}
                        {e.lote_id}
                      </small>
                    </td>
                    <td className={`v5-td-bar`}>
                      <div className={`v5-bar`}>
                        <i
                          style={{
                            width: `${Math.min(100, r)}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      {c === e.lote_id ? (
                        <span className={`asis-fila`}>
                          {e.leidas}
                          {` /`}
                          <input
                            className={`v5-num`}
                            aria-label={`Hojas esperadas`}
                            type={`number`}
                            min={0}
                            value={d}
                            autoFocus={!0}
                            onChange={(e) => f(e.target.value)}
                            onKeyDown={(t) =>
                              t.key === `Enter` && void E(e.lote_id)
                            }
                          />
                          <button
                            className={`link`}
                            onClick={() => void E(e.lote_id)}
                          >{`Guardar`}</button>
                        </span>
                      ) : (
                        <button
                          className={`link`}
                          title={`Escribe cuántas hojas esperabas (lista de aplicación)`}
                          onClick={() => {
                            u(e.lote_id),
                              f(e.esperado === null ? `` : String(e.esperado));
                          }}
                        >
                          {e.leidas}
                          {` / `}
                          {e.esperado ?? `¿?`}
                        </button>
                      )}
                    </td>
                    <td>
                      <span className={`pill ${n}`}>{t}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className={`v5-dos`}>
        <details
          className={`card`}
          onToggle={(e) => {
            e.target.open &&
              !o &&
              window.ocr
                .call(`control_resumen`)
                .then((e) => s(e.texto))
                .catch((e) => s(String(e)));
          }}
        >
          <summary>
            <b>{`Resumen de la semana`}</b>
          </summary>
          <pre className={`v5-pre`}>{o || `Calculando…`}</pre>
        </details>
        <div className={`card`}>
          <b>{`Seguimiento según documentos`}</b>
          <p
            className={`muted`}
          >{`Revisa los documentos confirmados en la Bandeja y propone qué pasos avanzar. Nada cambia hasta que pulses «Aplicar».`}</p>
          <button
            className={`btn`}
            onClick={() => void m.pedir(`proponer_avance`)}
          >{`Proponer avance`}</button>
          {m.aviso && <p className={`muted`}>{m.aviso}</p>}
          {m.tarjetas}
        </div>
      </div>
    </section>
  );
}
function InformeVerificacion({ lote: e }) {
  let [t, n] = useState(null),
    [r, i] = useState([]),
    [a, o] = useState(``),
    s = useCallback(async () => {
      n(await window.ocr.call(`control_informe`, {}));
    }, []);
  useEffect(() => {
    s().catch(() => void 0);
  }, [s]);
  let c = (e) => o(String(e).replace(/^Error:\s*/, ``));
  async function u() {
    if (e !== null)
      try {
        let t = await window.ocr.call(`control_muestra`, {
          lote_id: e,
          n: 10,
        });
        i(t.paginas);
      } catch (e) {
        c(e);
      }
  }
  async function d(e, t) {
    let n = null;
    if (
      !(
        !t &&
        ((n = window.prompt(
          `¿Qué dice el papel en ${e.clave}? (vacío = sin respuesta)`,
          ``,
        )),
        n === null)
      )
    )
      try {
        await window.ocr.call(`control_verificar`, {
          respuesta_id: e.respuesta_id,
          correcta: t,
          valor_real: n || null,
        }),
          i((n) =>
            n.map((n) => ({
              ...n,
              celdas: n.celdas.map((n) =>
                n.respuesta_id === e.respuesta_id
                  ? {
                      ...n,
                      correcta: +!!t,
                    }
                  : n,
              ),
            })),
          ),
          await s();
      } catch (e) {
        c(e);
      }
  }
  async function f() {
    try {
      let e = await window.ocr.call(`control_exportar`, {}),
        t = await window.ocr.guardarExportacion(e.ruta);
      t && o(`Informe guardado en ${t}`);
    } catch (e) {
      c(e);
    }
  }
  return (
    <div className={`card v5-verif`} aria-label={`Informe de verificación`}>
      <div className={`v5-hd`}>
        <div>
          <b>
            {`Informe de verificación`}
            {` `}
            {createElement(Pista, {
              texto: `Elige hojas al azar y compara cada casilla con el papel. Así sabes qué tan confiable es la lectura.`,
            })}
          </b>
          <p className={`muted`}>
            {t?.celdas
              ? `${t.correctas} de ${t.celdas} casillas correctas (${t.porcentaje} %) en ${t.paginas} hoja(s).`
              : `Todavía no se ha verificado ninguna hoja.`}
          </p>
        </div>
        <div className={`v5-fila`}>
          <button
            className={`btn`}
            disabled={e === null}
            onClick={() => void u()}
          >{`Sacar muestra de 10 hojas`}</button>
          <button
            className={`btn`}
            disabled={!t?.celdas}
            onClick={() => void f()}
          >{`Guardar informe…`}</button>
        </div>
      </div>
      {t && t.errores.length > 0 && (
        <details>
          <summary>
            {t.errores.length}
            {` diferencia(s) encontradas`}
          </summary>
          <table className={`v5-mini`}>
            <tbody>
              {t.errores.slice(0, 50).map((e, t) => (
                <tr key={t}>
                  <td>
                    {`Encuesta `}
                    {e.folio ?? `—`}
                  </td>
                  <td>{e.clave}</td>
                  <td>
                    {`leído «`}
                    {e.leido ?? `vacío`}
                    {`» · papel «`}
                    {e.real ?? `vacío`}
                    {`»`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
      {r.map((e) => (
        <div className={`v5-verif-pag`} key={e.id}>
          <small className={`muted`}>
            {`Encuesta `}
            {e.folio ?? `—`}
            {` · hoja `}
            {e.num}
          </small>
          <div className={`v5-verif-celdas`}>
            {e.celdas.map((e) => (
              <span
                className={`pill ${e.correcta === 1 ? `p-ok` : e.correcta === 0 ? `p-e` : ``}`}
                key={e.respuesta_id}
              >
                {e.clave}
                {`: `}
                {e.valor ?? `vacío`}
                <button
                  aria-label={`${e.clave} correcta`}
                  onClick={() => void d(e, !0)}
                >{`✓`}</button>
                <button
                  aria-label={`${e.clave} distinta`}
                  onClick={() => void d(e, !1)}
                >{`✗`}</button>
              </span>
            ))}
          </div>
        </div>
      ))}
      {a && <p className={`wb-msg`}>{a}</p>}
    </div>
  );
}
var De = {
    tablero: [`Panel de avance`, `Resumen de proyectos, lotes y documentos`],
    carga: [
      `Importar lote`,
      `Sube las encuestas escaneadas en PDF. Si un archivo ya estaba, no se repite.`,
    ],
    cola: [
      `Cola de procesamiento`,
      `Cada grupo de archivos subido y en qué va`,
    ],
    revision: [
      `Revisión`,
      `Respuestas que la app no pudo leer con seguridad: quedan vacías hasta que una persona decida`,
    ],
    exportacion: [
      `Resultados y exportación`,
      `Lo que no se pudo leer sale vacío en el Excel, nunca como 0`,
    ],
    usuarios: [`Usuarios y roles`, `Quién usa la app y qué puede hacer`],
  },
  Oe = {
    tablero: [
      [`codigo`, `Código`],
      [`nombre`, `Proyecto`],
      [`creado_en`, `Creado`],
    ],
    carga: [
      [`nombre`, `Archivo`],
      [`n_paginas`, `Páginas`],
      [`lote_id`, `Lote`],
    ],
    cola: [
      [`id`, `Lote`],
      [`estado`, `Estado`],
      [`fecha_aplicacion`, `Fecha de aplicación`],
      [`creado_en`, `Subido`],
    ],
    exportacion: [
      [`lote_id`, `Lote`],
      [`formato`, `Formato`],
      [`fecha`, `Fecha`],
      [`ruta`, `Archivo`],
    ],
    usuarios: [
      [`nombre`, `Nombre`],
      [`email`, `Correo`],
      [`rol`, `Rol`],
    ],
  },
  ke = {
    pendiente: `Pendiente`,
    procesado: `Procesado`,
    en_revision: `En revisión`,
    publicado: `Listo`,
    cancelado: `Cancelado`,
    con_errores: `Con errores`,
  },
  Ae = {
    admin: `Administración`,
    capturista: `Captura`,
    revisor: `Revisión`,
    lector: `Solo consulta`,
  },
  je = {
    doble_marca: `tiene dos marcas`,
    sin_marca: `no tiene marca`,
    marca_tenue: `la marca es muy tenue`,
    posible_borron: `parece tener un borrón`,
  };
function Me(e, t) {
  let n = String(t ?? ``);
  return e === `estado`
    ? (ke[n] ?? n)
    : e === `rol`
      ? (Ae[n] ?? n)
      : e === `ruta`
        ? (n.split(/[\\/]/).pop() ?? n)
        : e === `formato`
          ? n === `xlsx`
            ? `Excel`
            : n.toUpperCase()
          : n;
}
var Ne = (e) => je[String(e)] ?? String(e ?? ``).replace(/_/g, ` `),
  Pe = (e) => String(e).replace(/^Error:\s*/, ``),
  Fe = (e, t, n) => `${e} ${e === 1 ? t : n}`,
  Ie = (e) =>
    String(e.opciones ?? ``)
      .split(
        `
`,
      )
      .filter(Boolean)
      .map((e) => e.split(`	`));
function PantallaOperacion({ screen: e, stats: t, onChange: n }) {
  let [r, i] = useState([]),
    [a, o] = useState(``),
    [s, c] = useState(null),
    [u, d] = useState([]),
    [f, m] = useState(null),
    [h, g] = useState(null),
    [_, v] = useState(!1),
    [y, b] = useState({
      nombre: ``,
      email: ``,
      rol: `revisor`,
    });
  useEffect(() => {
    let t = {
      tablero: `proyectos`,
      carga: `documentos`,
      cola: `lotes`,
      exportacion: `exportaciones`,
      usuarios: `usuarios`,
    };
    (async () => {
      try {
        if (
          (e === `revision`
            ? i(await window.ocr.call(`cola_revision`))
            : t[e] &&
              i(
                await window.ocr.call(`list`, {
                  table: t[e],
                }),
              ),
          e === `exportacion` || e === `cola`)
        ) {
          let e = await window.ocr.call(`list`, {
            table: `lotes`,
          });
          d(e), m((t) => t ?? (e.length ? Number(e[e.length - 1].id) : null));
        }
      } catch (e) {
        c(Pe(e));
      }
    })();
  }, [e, t]);
  let x = async (e) => {
      v(!0), c(null);
      try {
        await e();
      } catch (e) {
        c(Pe(e));
      } finally {
        v(!1), n();
      }
    },
    S = async () => {
      let e = await window.ocr.openPdf();
      e.length &&
        (o(
          `Leyendo ${Fe(e.length, `archivo`, `archivos`)}… puede tardar un poco.`,
        ),
        await x(async () => {
          try {
            let t = await _e(e);
            o(
              [
                `Lote ${t.lote}`,
                ...t.archivos.map((e) =>
                  e.duplicado
                    ? `Este archivo ya estaba cargado: no se repitió.`
                    : e.error ||
                      `${Fe(e.paginas, `página leída`, `páginas leídas`)} · ${Fe(e.en_revision, `respuesta por revisar`, `respuestas por revisar`)}`,
                ),
              ].join(`
`),
            );
          } catch (t) {
            let n = Pe(t);
            if (!/instrumento/i.test(n))
              throw (
                (o(``),
                Error(n, {
                  cause: t,
                }))
              );
            let r = await ye(e);
            o(
              j(r).replace(/\nPuedes preguntarme[\s\S]*/, ``) +
                `
Sugerencia (opcional): si son encuestas, agrega su formato con «Importar formato de encuesta…» para leer las respuestas una por una.`,
            );
          }
        }));
    },
    C = async () => {
      let e = await window.ocr.openJson();
      if (!e) return;
      let t = await window.ocr.openImage();
      await x(async () => {
        let n = await window.ocr.call(`importar_plantilla`, {
          ruta_json: e,
          ruta_blank: t,
        });
        o(
          `Formato de encuesta agregado: ${Fe(n.items, `pregunta`, `preguntas`)}, ${Fe(n.casillas, `casilla`, `casillas`)}.` +
            (n.blank
              ? ``
              : `
Falta la imagen de la hoja en blanco: sin ella la app no puede ubicar las casillas.`),
        );
      });
    },
    w = (e, t) =>
      x(async () => {
        let n = await window.ocr.call(`cola_accion`, {
            lote_id: e,
            accion: t,
          }),
          r = n.documentos ?? [],
          a = 0;
        for (let [t, n] of r.entries()) {
          o(`Lote ${e}: leyendo archivo ${t + 1} de ${r.length}…`);
          try {
            await window.ocr.call(`procesar_documento`, {
              documento_id: n,
            });
          } catch {
            a++;
          }
          i(
            await window.ocr.call(`list`, {
              table: `lotes`,
            }),
          );
        }
        if (a)
          throw Error(
            `Lote ${e}: ${Fe(a, `archivo no se pudo leer`, `archivos no se pudieron leer`)}. El lote quedó «Con errores».`,
          );
        o(
          t === `cancelar`
            ? `Lote ${e} cancelado. Puedes reanudarlo cuando quieras.`
            : t === `reanudar`
              ? `Lote ${e} reanudado.`
              : `Lote ${e}: ${Fe((n.documentos ?? []).length, `archivo leído`, `archivos leídos`)}.`,
        );
      }),
    T = () =>
      x(async () => {
        if (f === null)
          throw Error(
            `Todavía no hay lotes. Primero carga encuestas en «Importar lote».`,
          );
        let e = await window.ocr.call(`exportar_lote`, {
          lote_id: f,
          formato: `xlsx`,
        });
        g(e.ruta),
          o(
            `Listo: ${Fe(e.filas, `encuesta`, `encuestas`)}, ${e.completas ?? `–`} completa(s). Pulsa «Guardar en…» para elegir dónde dejar el Excel.`,
          );
      }),
    E = () =>
      x(async () => {
        if (!y.nombre.trim() || !/^\S+@\S+\.\S+$/.test(y.email.trim()))
          throw Error(`Escribe el nombre y un correo válido.`);
        await window.ocr.call(`guardar_usuario`, {
          nombre: y.nombre.trim(),
          email: y.email.trim(),
          rol: y.rol,
        }),
          o(`Usuario «${y.nombre.trim()}» agregado.`),
          b({
            nombre: ``,
            email: ``,
            rol: `revisor`,
          });
      });
  return (
    <section className={`stage pad wb`}>
      <header>
        <div>
          <h1>{De[e]?.[0] ?? e}</h1>
          <p className={`sub`}>{De[e]?.[1]}</p>
        </div>
        {t && (
          <div className={`chips`}>
            <span>{Fe(t.lotes, `lote`, `lotes`)}</span>
            <span>
              {t.en_revision}
              {` por revisar`}
            </span>
          </div>
        )}
      </header>
      {s && <p className={`err wb-msg`}>{s}</p>}
      {e === `tablero` && t && (
        <div className={`cards`}>
          <div className={`card`}>
            <em>{`Proyectos`}</em>
            <b>{t.proyectos}</b>
          </div>
          <div className={`card`}>
            <em>{`Formatos de encuesta`}</em>
            <b>{t.instrumentos}</b>
          </div>
          <div className={`card`}>
            <em>{`Documentos`}</em>
            <b>{t.documentos}</b>
          </div>
          <div className={`card`}>
            <em>{`Páginas`}</em>
            <b>{t.paginas}</b>
          </div>
        </div>
      )}
      {e === `carga` && (
        <div className={`ayuda-carga`}>
          <div className={`actions`}>
            <button
              className={`btn primary`}
              disabled={_}
              onClick={() => void S()}
            >{`Cargar PDF…`}</button>
            <button
              className={`btn`}
              disabled={_}
              onClick={() => void C()}
            >{`Importar formato de encuesta…`}</button>
          </div>
          <p
            className={`muted`}
          >{`«Importar formato de encuesta» solo se usa una vez por cuestionario: te pedirá el archivo del formato que te entregó soporte y una imagen de la hoja en blanco.`}</p>
        </div>
      )}
      {e === `revision` &&
        r.map((e) => (
          <div className={`fila-revision`} key={String(e.id)}>
            <span>
              {`Encuesta `}
              <b>{String(e.folio ?? `—`)}</b>
              {` · pregunta `}
              <b>{String(e.clave)}</b>
              {` ·`}
              {` `}
              {Ne(e.aviso)}
              <small className={`muted`}>
                {` (`}
                {String(e.documento ?? ``)}
                {`)`}
              </small>
            </span>
            <span className={`actions`}>
              {Ie(e).map(([t, n]) => (
                <button
                  className={`btn`}
                  disabled={_}
                  onClick={() =>
                    void x(async () => {
                      await window.ocr.call(`revisar`, {
                        respuesta_id: e.id,
                        despues: t,
                      });
                    })
                  }
                  key={t}
                >
                  {n}
                </button>
              ))}
              <button
                className={`btn`}
                title={`Queda vacío en el Excel (nunca se inventa un valor)`}
                disabled={_}
                onClick={() =>
                  void x(async () => {
                    await window.ocr.call(`revisar`, {
                      respuesta_id: e.id,
                      despues: null,
                      motivo: `sin respuesta`,
                    });
                  })
                }
              >{`Sin respuesta`}</button>
            </span>
          </div>
        ))}
      {e === `exportacion` && (
        <div className={`actions`}>
          <label className={`wb-campo`}>
            {`Lote`}
            <select
              value={f ?? ``}
              onChange={(e) =>
                m(e.target.value ? Number(e.target.value) : null)
              }
            >
              {!u.length && (
                <option value={``}>{`(todavía no hay lotes)`}</option>
              )}
              {u.map((e) => (
                <option value={String(e.id)} key={String(e.id)}>
                  {`Lote `}
                  {String(e.id)}
                  {` · `}
                  {Me(`estado`, e.estado)}
                </option>
              ))}
            </select>
          </label>
          <button
            className={`btn primary`}
            disabled={_}
            onClick={() => void T()}
          >{`Exportar Excel (.xlsx)`}</button>
          {h && (
            <button
              className={`btn`}
              onClick={() =>
                void x(async () => {
                  let e = await window.ocr.guardarExportacion(h);
                  e && o(`Guardado en ${e}`);
                })
              }
            >{`Guardar en…`}</button>
          )}
        </div>
      )}
      {e === `exportacion` &&
        createElement(InformeVerificacion, {
          lote: f,
        })}
      {e === `usuarios` && (
        <div className={`wb-form card`}>
          <b>{`Agregar usuario`}</b>
          <label className={`wb-campo`}>
            {`Nombre`}
            <input
              value={y.nombre}
              onChange={(e) =>
                b({
                  ...y,
                  nombre: e.target.value,
                })
              }
            />
          </label>
          <label className={`wb-campo`}>
            {`Correo`}
            <input
              type={`email`}
              value={y.email}
              onChange={(e) =>
                b({
                  ...y,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label className={`wb-campo`}>
            {`Qué puede hacer`}
            <select
              value={y.rol}
              onChange={(e) =>
                b({
                  ...y,
                  rol: e.target.value,
                })
              }
            >
              {Object.entries(Ae).map(([e, t]) => (
                <option value={e} key={e}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <button
            className={`btn primary`}
            disabled={_}
            onClick={() => void E()}
          >{`Agregar`}</button>
          <p
            className={`muted`}
          >{`Por ahora los usuarios sirven de registro: la app no pide contraseña en este equipo.`}</p>
        </div>
      )}
      {a && <p className={`wb-msg ok-msg`}>{a}</p>}
      {e !== `revision` && r.length > 0 && Oe[e] && (
        <table>
          <thead>
            <tr>
              {Oe[e].map(([e, t]) => (
                <th key={e}>{t}</th>
              ))}
              {e === `cola` && <th>{`Acciones`}</th>}
            </tr>
          </thead>
          <tbody>
            {r.slice(0, 30).map((t, n) => (
              <tr key={n}>
                {Oe[e].map(([e]) => (
                  <td key={e}>{Me(e, t[e])}</td>
                ))}
                {e === `cola` && (
                  <td className={`actions`}>
                    {t.estado === `cancelado` ? (
                      <button
                        className={`btn`}
                        disabled={_}
                        onClick={() => void w(Number(t.id), `reanudar`)}
                      >{`Reanudar`}</button>
                    ) : (
                      <>
                        <button
                          className={`btn`}
                          disabled={_}
                          title={`Lee los archivos del lote que aún no se han leído`}
                          onClick={() => void w(Number(t.id), `procesar`)}
                        >{`Leer pendientes`}</button>
                        <button
                          className={`btn`}
                          disabled={_}
                          onClick={() => void w(Number(t.id), `cancelar`)}
                        >{`Cancelar`}</button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {e === `revision` && r.length === 0 && !s && (
        <p className={`muted`}>{`No hay respuestas pendientes de revisar.`}</p>
      )}
      {e === `cola` && r.length === 0 && !s && (
        <p
          className={`muted`}
        >{`Aún no hay lotes. Carga encuestas en «Importar lote».`}</p>
      )}
    </section>
  );
}
function useActualizador() {
  let [e, t] = useState(null);
  return (
    useEffect(
      () => (
        window.ocr.actualizador.estado().then((e) => t(e)),
        window.ocr.actualizador.alCambiar((e) => t(e))
      ),
      [],
    ),
    [e, t]
  );
}
function BannerActualizacion() {
  let [e] = useActualizador(),
    [t, n] = useState(``);
  return !e ||
    !e.activo ||
    !e.version ||
    ![`disponible`, `descargando`, `listo`, `error`].includes(e.fase) ||
    t === `${e.version}:${e.fase}` ? null : (
    <div className={`aviso-act`} role={`status`}>
      {e.fase === `disponible` && (
        <>
          <span>
            {`Hay una actualización (v`}
            {e.version}
            {`)`}
          </span>
          <button
            className={`btn primary`}
            onClick={() => void window.ocr.actualizador.descargar()}
          >{`Descargar`}</button>
        </>
      )}
      {e.fase === `descargando` && (
        <>
          <span>
            {`Descargando v`}
            {e.version}
            {`…`}
          </span>
          <progress max={100} value={e.progreso ?? 0} />
          <span>
            {e.progreso ?? 0}
            {`%`}
          </span>
        </>
      )}
      {e.fase === `listo` && (
        <>
          <span>
            {`La versión v`}
            {e.version}
            {` está lista. Puedes seguir trabajando y actualizar cuando quieras.`}
          </span>
          <button
            className={`btn primary`}
            onClick={() => void window.ocr.actualizador.instalar()}
          >{`Reiniciar y actualizar`}</button>
        </>
      )}
      {e.fase === `error` && (
        <>
          <span>{e.error}</span>
          <button
            className={`btn`}
            onClick={() => void window.ocr.actualizador.descargar()}
          >{`Reintentar`}</button>
        </>
      )}
      <button
        className={`btn ghost`}
        onClick={() => n(`${e.version}:${e.fase}`)}
      >{`Ahora no`}</button>
    </div>
  );
}
function Be() {
  let [e, t] = useActualizador();
  return e ? (
    <div className={`box`}>
      <div className={`lbl`}>{`Actualizaciones`}</div>
      <label>
        <input
          type={`checkbox`}
          checked={e.activo}
          onChange={(e) =>
            void window.ocr.actualizador
              .activar(e.target.checked)
              .then((e) => t(e))
          }
        />
        {` `}
        {`Avisarme cuando haya una versión nueva`}
      </label>
      <p className={`muted`}>
        {`Versión instalada: `}
        {e.actual}
        {`. La app nunca se actualiza sola: te avisa y tú decides cuándo descargar y reiniciar.`}
        {e.fase === `al-dia` ? ` Estás al día.` : ``}
      </p>
      {e.empaquetada && e.activo && (
        <button
          className={`btn`}
          onClick={() => void window.ocr.actualizador.buscar()}
        >{`Buscar ahora`}</button>
      )}
    </div>
  ) : null;
}
function MenuAvisos({ alConfirmar: e }) {
  let [t] = useActualizador(),
    { cambios: n } = le(),
    [r, i] = useState(!1),
    a = useRef(null);
  useEffect(() => window.ocr.actualizador.alAbrir(() => i(!0)), []),
    useEffect(() => {
      if (!r) return;
      let e = (e) => {
        a.current && !a.current.contains(e.target) && i(!1);
      };
      return (
        document.addEventListener(`mousedown`, e),
        () => document.removeEventListener(`mousedown`, e)
      );
    }, [r]);
  let o =
      t &&
      t.activo &&
      t.version &&
      [`disponible`, `descargando`, `listo`, `error`].includes(t.fase)
        ? t
        : null,
    s = n.filter((e) => e.estado === `por_confirmar`).length,
    c = !!o || s > 0;
  return (
    <div className={`campana`} ref={a}>
      <button
        className={`campana-btn`}
        title={c ? `Tienes avisos` : `Sin avisos`}
        aria-label={`Avisos`}
        onClick={() => i(!r)}
      >
        {`🔔`}
        {c && <span className={`campana-punto`} />}
      </button>
      {r && (
        <div className={`campana-menu`} role={`dialog`}>
          <div className={`lbl`}>{`Avisos`}</div>
          {o && (
            <div className={`campana-item`}>
              {o.fase === `disponible` && (
                <>
                  <b>
                    {`Versión `}
                    {o.version}
                    {` disponible`}
                  </b>
                  <small>
                    {`Tienes la `}
                    {o.actual}
                    {`. La descarga no interrumpe tu trabajo.`}
                  </small>
                  <button
                    className={`btn primary`}
                    onClick={() => void window.ocr.actualizador.descargar()}
                  >{`Descargar`}</button>
                </>
              )}
              {o.fase === `descargando` && (
                <>
                  <b>
                    {`Descargando versión `}
                    {o.version}
                    {`…`}
                  </b>
                  <progress max={100} value={o.progreso ?? 0} />
                </>
              )}
              {o.fase === `listo` && (
                <>
                  <b>
                    {`Versión `}
                    {o.version}
                    {` lista`}
                  </b>
                  <small>{`Se cierra la app, se instala y vuelve a abrir.`}</small>
                  <button
                    className={`btn primary`}
                    onClick={() => void window.ocr.actualizador.instalar()}
                  >{`Reiniciar y actualizar`}</button>
                </>
              )}
              {o.fase === `error` && (
                <>
                  <b>{`No se pudo actualizar`}</b>
                  <small>{o.error}</small>
                  <button
                    className={`btn`}
                    onClick={() => void window.ocr.actualizador.descargar()}
                  >{`Reintentar`}</button>
                </>
              )}
            </div>
          )}
          {s > 0 && (
            <div className={`campana-item`}>
              <b>
                {s}
                {` cambio(s) por confirmar`}
              </b>
              <small>{`La IA propuso cambios en Seguimiento que esperan tu visto bueno.`}</small>
              <button
                className={`btn`}
                onClick={() => {
                  i(!1), e?.();
                }}
              >{`Ver en el Asistente`}</button>
            </div>
          )}
          {!c && (
            <small
              className={`muted`}
            >{`No hay avisos. Tienes la versión más reciente.`}</small>
          )}
        </div>
      )}
    </div>
  );
}
var He = `data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%3e%3cdefs%3e%3clinearGradient%20id='ia'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%233F53C3'/%3e%3cstop%20offset='.55'%20stop-color='%231363C3'/%3e%3cstop%20offset='1'%20stop-color='%2310B5CD'/%3e%3c/linearGradient%3e%3clinearGradient%20id='ib'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231a3fae'/%3e%3cstop%20offset='1'%20stop-color='%2310B5CD'/%3e%3c/linearGradient%3e%3clinearGradient%20id='ic'%20x1='0'%20y1='1'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%232b8f6a'/%3e%3cstop%20offset='.5'%20stop-color='%231363C3'/%3e%3cstop%20offset='1'%20stop-color='%233DBCCB'/%3e%3c/linearGradient%3e%3clinearGradient%20id='ibg'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%230d0d10'/%3e%3cstop%20offset='1'%20stop-color='%23050506'/%3e%3c/linearGradient%3e%3cfilter%20id='ig'%20x='-20%25'%20y='-20%25'%20width='140%25'%20height='140%25'%3e%3cfeGaussianBlur%20stdDeviation='4'/%3e%3c/filter%3e%3c/defs%3e%3crect%20width='256'%20height='256'%20rx='58'%20fill='url(%23ibg)'/%3e%3cg%20transform='translate(128%20128)%20scale(1.12)%20translate(-135%20-133)'%3e%3cg%20filter='url(%23ig)'%20opacity='.55'%3e%3cpath%20d='M62%20196V151L140%2068M62%20138V100'%20fill='none'%20stroke='%239AC43A'%20stroke-width='5'/%3e%3cpolygon%20points='111,156%20130,135%20200,199%20151,199'%20fill='none'%20stroke='%2310B5CD'%20stroke-width='4'/%3e%3c/g%3e%3cpolygon%20points='62,99%2095,67%2095,109%2062,138'%20fill='url(%23ic)'%20fill-opacity='.5'%20stroke='%233DBCCB'%20stroke-opacity='.9'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='62,150%20160,47%20208,47%2062,198'%20fill='url(%23ia)'%20fill-opacity='.58'%20stroke='%237fd8ec'%20stroke-opacity='.85'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='111,156%20130,135%20200,199%20151,199'%20fill='url(%23ib)'%20fill-opacity='.58'%20stroke='%235fd6e8'%20stroke-opacity='.9'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpath%20d='M89%20125L110%20148'%20stroke='%23bfefff'%20stroke-opacity='.7'%20stroke-width='1.6'/%3e%3cpath%20d='M62%20138V100M62%20196V151L140%2068'%20fill='none'%20stroke='%239AC43A'%20stroke-width='2.6'%20stroke-linecap='round'/%3e%3cpath%20d='M163%2050H204'%20stroke='%23fff'%20stroke-opacity='.55'%20stroke-width='1.4'%20stroke-linecap='round'/%3e%3c/g%3e%3crect%20x='1'%20y='1'%20width='254'%20height='254'%20rx='57'%20fill='none'%20stroke='%23fff'%20stroke-opacity='.14'%20stroke-width='2'/%3e%3c/svg%3e`;
function AccesoAdmin() {
  let [e, t] = useState(``),
    [n, r] = useState(!1),
    [i, a] = useState([]),
    [o, s] = useState(``),
    [c, u] = useState(null),
    [d, f] = useState({}),
    [m, h] = useState({}),
    [g, _] = useState(``),
    v = (e) => _(String(e).replace(/^Error:\s*/, ``));
  async function y(t = o) {
    a(
      await window.ocr.cerebro.llamar(e, `listar`, {
        q: t,
      }),
    );
  }
  async function b() {
    _(``);
    try {
      if (!(await window.ocr.cerebro.entrar(e.trim())).ok)
        return _(`Ese correo no es de un administrador de este equipo.`);
      r(!0), await y(``);
      let t = await window.ocr.call(`proyecto_config`, {});
      h(t.config || {}), f(t.config?.seguimiento ?? {});
    } catch (e) {
      v(e);
    }
  }
  async function x() {
    if (c && window.confirm(`¿Guardar el cambio en esta memoria?`))
      try {
        await window.ocr.cerebro.llamar(e, `editar`, {
          id: c.id,
          texto: c.texto,
        }),
          u(null),
          await y();
      } catch (e) {
        v(e);
      }
  }
  async function S(t) {
    if (window.confirm(`¿Borrar esta memoria?\n\n«${t.texto.slice(0, 120)}»`))
      try {
        await window.ocr.cerebro.llamar(e, `borrar`, {
          id: t.id,
        }),
          await y();
      } catch (e) {
        v(e);
      }
  }
  async function C() {
    if (
      window.confirm(
        `¿Cambiar las direcciones de Seguimiento de este proyecto?`,
      )
    )
      try {
        await window.ocr.call(`proyecto_guardar_config`, {
          config: {
            ...m,
            seguimiento: d,
          },
        }),
          _(`Direcciones guardadas.`),
          window.dispatchEvent(new Event(`proyecto`));
      } catch (e) {
        v(e);
      }
  }
  return (
    <details className={`card v5-avanzado`} aria-label={`Avanzado`}>
      <summary>{`Avanzado · solo administración`}</summary>
      <p
        className={`muted`}
      >{`Ajustes delicados. Cambiarlos puede afectar al Asistente o a las actualizaciones de avance.`}</p>
      {n ? (
        <>
          <h3>{`Memoria del Asistente`}</h3>
          <p
            className={`muted`}
          >{`Lo que el Asistente recuerda de este proyecto (sin datos personales). Se guarda solo en este equipo.`}</p>
          <form
            className={`v5-fila`}
            onSubmit={(e) => {
              e.preventDefault(), y().catch(v);
            }}
          >
            <input
              placeholder={`Buscar en la memoria`}
              aria-label={`Buscar en la memoria`}
              value={o}
              onChange={(e) => s(e.target.value)}
            />
            <button className={`btn`}>{`Buscar`}</button>
          </form>
          {i.length === 0 ? (
            <div
              className={`v5-vacio`}
            >{`Todavía no hay memorias guardadas.`}</div>
          ) : (
            <table className={`v5-tabla`}>
              <tbody>
                {i.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className={`pill`}>{e.tipo}</span>
                    </td>
                    <td>
                      {c?.id === e.id ? (
                        <textarea
                          aria-label={`Texto de la memoria`}
                          value={c.texto}
                          onChange={(t) =>
                            u({
                              id: e.id,
                              texto: t.target.value,
                            })
                          }
                        />
                      ) : (
                        e.texto
                      )}
                    </td>
                    <td className={`v5-fila`}>
                      {c?.id === e.id ? (
                        <>
                          <button
                            className={`link`}
                            onClick={() => void x()}
                          >{`Guardar`}</button>
                          <button
                            className={`link`}
                            onClick={() => u(null)}
                          >{`Cancelar`}</button>
                        </>
                      ) : (
                        <>
                          <button
                            className={`link`}
                            onClick={() =>
                              u({
                                id: e.id,
                                texto: e.texto,
                              })
                            }
                          >{`Editar`}</button>
                          <button
                            className={`link`}
                            onClick={() => void S(e)}
                          >{`Borrar`}</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <h3>{`Direcciones de Seguimiento`}</h3>
          <label className={`lbl`}>
            {`Dirección de la API`}
            <input
              value={d.api_url ?? ``}
              onChange={(e) =>
                f({
                  ...d,
                  api_url: e.target.value,
                })
              }
            />
          </label>
          <label className={`lbl`}>
            {`Dirección de archivos estáticos`}
            <input
              value={d.estaticos_url ?? ``}
              onChange={(e) =>
                f({
                  ...d,
                  estaticos_url: e.target.value,
                })
              }
            />
          </label>
          <button
            className={`btn`}
            onClick={() => void C()}
          >{`Guardar direcciones`}</button>
        </>
      ) : (
        <form
          className={`v5-fila`}
          onSubmit={(e) => {
            e.preventDefault(), b();
          }}
        >
          <input
            type={`email`}
            placeholder={`Correo de administración`}
            aria-label={`Correo de administración`}
            value={e}
            onChange={(e) => t(e.target.value)}
          />
          <button className={`btn`} disabled={!e.trim()}>{`Entrar`}</button>
        </form>
      )}
      {g && <p className={`wb-msg`}>{g}</p>}
    </details>
  );
}
var We = [
    {
      id: `azul`,
      nombre: `Azul`,
      accent: `#2563eb`,
    },
    {
      id: `negro`,
      nombre: `Negro`,
      accent: `#0a0a0a`,
    },
    {
      id: `violeta`,
      nombre: `Violeta`,
      accent: `#7c3aed`,
    },
    {
      id: `rosa`,
      nombre: `Rosa`,
      accent: `#e11d48`,
    },
    {
      id: `esmeralda`,
      nombre: `Esmeralda`,
      accent: `#059669`,
    },
  ],
  Ge = {
    productName: `Lector de encuestas`,
    shortName: `Lector`,
    accent: `#2563eb`,
    logo: null,
  },
  Ke = `lector-brand`;
function qe(e) {
  let t = e.replace(`#`, ``),
    n = parseInt(t.length === 3 ? t.replace(/(.)/g, `$1$1`) : t, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function Je(e, t) {
  let [n, r, i] = qe(e),
    a = (e) => Math.round(e + (255 - e) * t);
  return `#${[a(n), a(r), a(i)].map((e) => e.toString(16).padStart(2, `0`)).join(``)}`;
}
function Ye(e) {
  let t = qe(e).map((e) => {
    let t = e / 255;
    return t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4;
  });
  return 1.05 / (0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2] + 0.05);
}
function Xe(e) {
  return {
    "--accent": e,
    "--accent-2": Je(e, 0.3),
    "--accent-soft": Je(e, 0.9),
    "--accent-ink": e,
  };
}
function Ze(e) {
  let t = document.documentElement;
  for (let [n, r] of Object.entries(Xe(e.accent))) t.style.setProperty(n, r);
  document.title = e.productName;
}
function Qe(e) {
  try {
    let t = localStorage.getItem(Ke);
    if (t)
      return {
        ...e,
        ...JSON.parse(t),
      };
  } catch {}
  return e;
}
function $e(e) {
  localStorage.setItem(Ke, JSON.stringify(e));
}
function et() {
  localStorage.removeItem(Ke);
}
function PantallaPersonalizacion({ brand: e, base: t, onSave: n, onReset: r }) {
  let [i, a] = useState(e),
    [o, s] = useState(``),
    c = Ye(i.accent),
    u = Xe(i.accent),
    d = (e) => {
      if (!e) return;
      if (!/image\/(png|svg\+xml)/.test(e.type)) return s(`Solo SVG o PNG.`);
      if (e.size > 2097152) return s(`Máximo 2 MB.`);
      s(``);
      let t = new FileReader();
      (t.onload = () =>
        a({
          ...i,
          logo: String(t.result),
        })),
        t.readAsDataURL(e);
    };
  return (
    <section className={`stage pad`}>
      <h1>{`Personalización`}</h1>
      <p
        className={`sub`}
      >{`Solo administradores · nombre, logo y color de tu organización`}</p>
      <div className={`split`}>
        <div className={`box`}>
          <div className={`lbl`}>{`Logo`}</div>
          <label
            className={`drop`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault(), d(e.dataTransfer.files[0]);
            }}
          >
            {i.logo ? (
              <img src={i.logo} alt={`logo`} />
            ) : (
              <>
                <b>{`Arrastra tu logo aquí`}</b>
                <span>{`SVG o PNG · fondo transparente · máx. 2 MB`}</span>
              </>
            )}
            <input
              type={`file`}
              accept={`image/png,image/svg+xml`}
              hidden={!0}
              onChange={(e) => d(e.target.files?.[0])}
            />
          </label>
          <p className={`hint`}>
            {`Actual: `}
            {i.logo ? `logo propio` : `logo de la app (predeterminado)`}
            {i.logo && (
              <button
                className={`link`}
                onClick={() =>
                  a({
                    ...i,
                    logo: null,
                  })
                }
              >{`Quitar`}</button>
            )}
          </p>
          {o && <p className={`err`}>{o}</p>}
          <div className={`lbl`}>{`Nombre del producto`}</div>
          <input
            className={`field`}
            value={i.productName}
            onChange={(e) =>
              a({
                ...i,
                productName: e.target.value,
              })
            }
          />
          <div className={`lbl`}>{`Color principal`}</div>
          <div className={`swatches`}>
            {We.map((e) => (
              <button
                title={e.nombre}
                className={i.accent.toLowerCase() === e.accent ? `sw on` : `sw`}
                style={{
                  background: e.accent,
                }}
                onClick={() =>
                  a({
                    ...i,
                    accent: e.accent,
                  })
                }
                key={e.id}
              />
            ))}
            <input
              type={`color`}
              value={i.accent}
              onChange={(e) =>
                a({
                  ...i,
                  accent: e.target.value,
                })
              }
            />
          </div>
          <input
            className={`field short`}
            value={i.accent}
            onChange={(e) =>
              /^#[0-9a-fA-F]{6}$/.test(e.target.value) &&
              a({
                ...i,
                accent: e.target.value,
              })
            }
          />
          <p className={c >= 4.5 ? `hint ok` : `hint err`}>
            {c >= 4.5 ? `✔` : `✖`}
            {` `}
            {c >= 4.5
              ? `El texto blanco se lee bien sobre este color`
              : `El texto blanco se lee mal: elige un tono más oscuro`}
          </p>
          <div className={`actions`}>
            <button
              className={`btn`}
              onClick={() => {
                a(t), r();
              }}
            >{`Restablecer`}</button>
            <button
              className={`btn primary`}
              disabled={c < 4.5}
              onClick={() => n(i)}
            >{`Guardar y aplicar`}</button>
          </div>
        </div>
        <div className={`box`}>
          <div className={`lbl`}>{`Vista previa`}</div>
          <div className={`preview`} style={u}>
            <div className={`pv-bar`}>
              <span className={`conf-pill`}>{`🔒 CONFIDENCIAL`}</span>
            </div>
            <div className={`pv-body`}>
              <div className={`pv-side`}>
                <div className={`logo-slot`}>
                  {i.logo ? (
                    <img src={i.logo} alt={``} />
                  ) : (
                    <img src={He} alt={``} />
                  )}
                </div>
                <div className={`nav on`}>{`Panel de avance`}</div>
                <div className={`nav`}>{`Importar lote`}</div>
                <div className={`nav`}>{`Revisión`}</div>
              </div>
              <div className={`pv-main`}>
                <h3>{`Panel de avance`}</h3>
                <div className={`cards`}>
                  <div className={`card`}>
                    <em>{`Proyecto A`}</em>
                    <b>{`412`}</b>
                    <i
                      className={`bar`}
                      style={{
                        width: `70%`,
                      }}
                    />
                  </div>
                  <div className={`card`}>
                    <em>{`Proyecto B`}</em>
                    <b>{`75`}</b>
                    <i
                      className={`bar`}
                      style={{
                        width: `25%`,
                      }}
                    />
                  </div>
                </div>
                <div className={`actions`}>
                  <button className={`primary`}>{`Botón primario`}</button>
                  <span className={`tag`}>{`Etiqueta`}</span>
                  <span className={`tag strong`}>{`Dudosa`}</span>
                </div>
              </div>
            </div>
          </div>
          <p
            className={`hint`}
          >{`El indicador de confidencial no se puede ocultar ni recolorear.`}</p>
        </div>
      </div>
      {createElement(Be, null)}
      {createElement(AccesoAdmin, null)}
    </section>
  );
}
var nt = [
    `Sin iniciar`,
    `En proceso`,
    `Avanzado`,
    `Hecho`,
    `Terminado`,
    `No aplica`,
  ],
  rt = (e) => String(e).replace(/^Error: /, ``);
function it({ r: e }) {
  let t = (e, t) => (
    <tr key={e}>
      <td>{e}</td>
      <td>{t.nuevas}</td>
      <td>{t.actualizadas}</td>
      <td>{t.iguales}</td>
    </tr>
  );
  return (
    <>
      <table className={`tabla`}>
        <thead>
          <tr>
            <th />
            <th>{`Nuevas`}</th>
            <th>{`Actualizadas`}</th>
            <th>{`Sin cambio`}</th>
          </tr>
        </thead>
        <tbody>
          {t(`Actividades`, e.actividades)}
          {t(`Pasos`, e.pasos)}
          {(e.eventos.nuevas > 0 ||
            e.eventos.actualizadas > 0 ||
            e.eventos.iguales > 0) &&
            t(`Calendario`, e.eventos)}
          {(e.registros.nuevas > 0 ||
            e.registros.actualizadas > 0 ||
            e.registros.iguales > 0) &&
            t(`Obs./docs./bitácora/diarios`, e.registros)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={`muted`}>
              {e.manuales_conservados}
              {` edición(es) hecha(s) en la app se conserva(n) ·`}
              {` `}
              {e.borradas_omitidas}
              {` borrada(s) en la app no se vuelven a traer`}
            </td>
          </tr>
        </tfoot>
      </table>
      {!!e.detalle?.length && (
        <details className={`sg-detalle`} open={e.detalle.length <= 12}>
          <summary>
            {`Qué cambiaría (`}
            {e.detalle.length}
            {`)`}
          </summary>
          <ul>
            {e.detalle.map((e, t) => (
              <li key={t}>{e}</li>
            ))}
          </ul>
        </details>
      )}
    </>
  );
}
function at({ sugerida: e, onCambio: t }) {
  let [n, r] = useState({
      api_url: e?.api_url ?? ``,
      estaticos_url: e?.estaticos_url ?? ``,
    }),
    [i, a] = useState(null),
    [o, s] = useState(`excel`),
    [c, u] = useState(``),
    [d, f] = useState(!1),
    [m, h] = useState(``),
    [g, _] = useState(null),
    [v, y] = useState({}),
    [b, x] = useState(!1),
    [S, C] = useState(!1),
    w = m.split(/[\\/]/).pop() || m,
    T = async (e, t) => {
      let n = await window.ocr.call(`seg_excel_importar`, {
        ruta: e,
        mapeo: t,
        aplicar: !1,
      });
      a(n),
        s(`excel`),
        u(`Esto es lo que cambiaría. Todavía no se ha guardado nada.`);
    },
    E = async (e) => {
      if (e) {
        if (!/\.(xlsx|xls|csv)$/i.test(e))
          u(`Ese archivo no es un Excel. Usa un archivo .xlsx, .xls o .csv.`);
        else {
          f(!0), a(null), h(e), u(`Leyendo el archivo…`);
          try {
            let t = await window.ocr.call(`seg_excel_leer`, {
              ruta: e,
            });
            _(t),
              y(t.mapeo),
              t.filas
                ? t.faltan.length
                  ? (x(!0),
                    u(`No reconocimos algunas columnas. Indica cuál es cuál.`))
                  : (x(!1), await T(e, t.mapeo))
                : u(`El archivo no tiene filas con datos.`);
          } catch (e) {
            u(`No se pudo leer el archivo: ` + rt(e));
          } finally {
            f(!1);
          }
        }
      }
    },
    D = async () => {
      f(!0);
      try {
        await T(m, v), x(!1);
      } catch (e) {
        u(rt(e));
      } finally {
        f(!1);
      }
    },
    O = async () => {
      if (o === `hoja`) return ee(!0);
      f(!0), u(`Guardando los cambios…`);
      try {
        let e = await window.ocr.call(`seg_excel_importar`, {
          ruta: m,
          mapeo: v,
          aplicar: !0,
        });
        a(e),
          u(
            `Listo: el avance del Excel ya está en la app. Tus ediciones se conservaron.`,
          ),
          t();
      } catch (e) {
        u(`No se pudo aplicar: ` + rt(e));
      } finally {
        f(!1);
      }
    },
    k = async () => {
      try {
        let e = await window.ocr.guardarPlantillaExcel();
        e && u(`Plantilla guardada en ` + e);
      } catch (e) {
        u(`No se pudo guardar la plantilla: ` + rt(e));
      }
    },
    ee = async (e) => {
      f(!0),
        s(`hoja`),
        u(e ? `Aplicando cambios…` : `Leyendo la hoja (solo lectura)…`);
      try {
        let r = await window.ocr.seguimiento.importar({
          ...n,
          aplicar: e,
        });
        a(r),
          u(
            e
              ? `Cambios aplicados en la app.`
              : `Esto es lo que cambiaría. Todavía no se ha guardado nada.`,
          ),
          e && t();
      } catch (e) {
        u(`No se pudo leer la hoja: ` + rt(e));
      } finally {
        f(!1);
      }
    };
  return (
    <section className={`card sg-gest`}>
      <h3>{`Traer el avance desde la hoja del proyecto`}</h3>
      <p
        className={`muted`}
      >{`Carga el Excel con el avance. Primero verás qué cambiaría y nada se guarda hasta que pulses «Aplicar cambios». Lo que hayas editado en la app se respeta. El archivo solo se lee: nunca se modifica.`}</p>
      <div
        className={`sg-drop` + (S ? ` encima` : ``)}
        onDragOver={(e) => {
          e.preventDefault(), C(!0);
        }}
        onDragLeave={() => C(!1)}
        onDrop={(e) => {
          e.preventDefault(), C(!1);
          let t = e.dataTransfer.files?.[0];
          t && E(window.ocr.rutaDe(t) || t.name);
        }}
      >
        <button
          className={`btn primary`}
          disabled={d}
          onClick={async () => void E(await window.ocr.openExcel())}
        >{`Cargar Excel`}</button>
        <span
          className={`muted`}
        >{`o arrastra aquí tu archivo (.xlsx, .xls o .csv)`}</span>
        {m && (
          <strong className={`sg-archivo`}>
            {`📄 `}
            {w}
          </strong>
        )}
      </div>
      <button
        className={`link`}
        onClick={() => void k()}
      >{`Descargar plantilla de Excel`}</button>
      {b && g && (
        <div className={`sg-emparejar`}>
          <p>
            <strong>{`¿Qué columna es cada dato?`}</strong>
            {` Solo el código de la actividad es obligatorio.`}
          </p>
          {g.campos.map(({ campo: e, etiqueta: t }) => (
            <label key={e}>
              {t}
              {e === `codigo` ? ` *` : ``}
              <select
                value={v[e] ?? -1}
                onChange={(t) => {
                  let n = Number(t.target.value),
                    r = {
                      ...v,
                    };
                  n < 0 ? delete r[e] : (r[e] = n), y(r);
                }}
              >
                <option value={-1}>{`— no está en el archivo —`}</option>
                {g.encabezados.map((e, t) => (
                  <option value={t} key={t}>
                    {e || `Columna ${t + 1}`}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <div className={`actions`}>
            <button
              className={`btn primary`}
              disabled={d || v.codigo === void 0}
              onClick={() => void D()}
            >{`Ver qué cambiaría`}</button>
          </div>
        </div>
      )}
      {c && <p className={`muted sg-msg`}>{c}</p>}
      {i &&
        createElement(it, {
          r: i,
        })}
      {i && (
        <div className={`actions`}>
          <button
            className={`btn primary`}
            disabled={d || i.aplicado}
            onClick={() => void O()}
          >{`Aplicar cambios`}</button>
          {g && o === `excel` && !i.aplicado && (
            <button
              className={`btn`}
              disabled={d}
              onClick={() => x(!0)}
            >{`Cambiar columnas`}</button>
          )}
        </div>
      )}
      <details className={`avanzado`}>
        <summary>{`Avanzado (para soporte técnico)`}</summary>
        <label>
          {`Dirección de la hoja publicada`}
          <input
            value={n.api_url}
            placeholder={`https://…`}
            onChange={(e) =>
              r({
                ...n,
                api_url: e.target.value,
              })
            }
          />
        </label>
        <label>
          {`Dirección de los archivos de respaldo (opcional)`}
          <input
            value={n.estaticos_url}
            placeholder={`https://…/data`}
            onChange={(e) =>
              r({
                ...n,
                estaticos_url: e.target.value,
              })
            }
          />
        </label>
        <div className={`actions`}>
          <button
            className={`btn`}
            disabled={d}
            onClick={() => void ee(!1)}
          >{`Vista previa desde la hoja publicada`}</button>
        </div>
      </details>
    </section>
  );
}
function ot({ texto: e, si: t, no: n }) {
  return (
    <div className={`modal-fondo`}>
      <div className={`modal card`} role={`alertdialog`}>
        <h3>{`¿Borrar?`}</h3>
        <p>{e}</p>
        <div className={`actions`}>
          <button className={`btn`} onClick={n}>{`Cancelar`}</button>
          <button className={`primary peligro`} onClick={t}>{`Borrar`}</button>
        </div>
      </div>
    </div>
  );
}
var st = {
  codigo: ``,
  nombre: ``,
  tab: ``,
  sigla: ``,
  responsable: ``,
  inicio: ``,
  fin: ``,
  notas: ``,
};
function ct({ onCambio: e }) {
  let [t, n] = useState({
      actividades: [],
      eventos: [],
    }),
    [r, i] = useState(null),
    [a, o] = useState(null),
    [s, c] = useState(null),
    [u, d] = useState(null),
    [f, m] = useState(null),
    [h, g] = useState(``),
    _ = useCallback(async () => {
      n(await window.ocr.call(`seg_listar`, {}));
    }, []);
  useEffect(() => {
    (async () => n(await window.ocr.call(`seg_listar`, {})))();
  }, []);
  let v = async (t, n, r) => {
    try {
      return await window.ocr.call(t, n), g(r), await _(), e(), !0;
    } catch (e) {
      return g(rt(e)), !1;
    }
  };
  return (
    <section className={`card sg-gest`}>
      <div className={`sg-gest-cab`}>
        <h3>{`Actividades y pasos`}</h3>
        <button
          className={`primary`}
          onClick={() =>
            i({
              ...st,
            })
          }
        >{`+ Actividad`}</button>
      </div>
      {h && <small className={`muted`}>{h}</small>}
      {!t.actividades.length && (
        <p
          className={`muted`}
        >{`Aún no hay actividades. Crea una o importa.`}</p>
      )}
      <ul className={`sg-gest-lista`}>
        {t.actividades.map((e) => (
          <li key={e.id}>
            <div className={`fila`}>
              <button
                className={`link sg-gest-act`}
                onClick={() => m(f === e.id ? null : e.id)}
              >
                {f === e.id ? `▾` : `▸`}
                {` `}
                <strong>{e.codigo}</strong>
                {` `}
                {e.nombre}
              </button>
              <span className={`muted`}>
                {e.responsable || `sin responsable`}
                {` · `}
                {e.fin || `sin fecha`}
                {` · `}
                {e.pasos.length}
                {` `}
                {`paso(s)`}
                {e.origen === `hoja` ? ` · importada` : ``}
              </span>
              <button
                className={`btn`}
                onClick={() =>
                  i({
                    ...st,
                    ...e,
                  })
                }
              >{`Editar`}</button>
              <button
                className={`btn`}
                onClick={() =>
                  d({
                    cmd: `seg_actividad_borrar`,
                    id: e.id,
                    texto: `Actividad ${e.codigo} y sus ${e.pasos.length} paso(s).`,
                  })
                }
              >{`Borrar`}</button>
            </div>
            {f === e.id && (
              <table className={`tabla`}>
                <tbody>
                  {e.pasos.map((t) => (
                    <tr key={t.id}>
                      <td>{t.paso}</td>
                      <td>{t.fecha}</td>
                      <td>{t.estado}</td>
                      <td>{t.responsable}</td>
                      <td>
                        <button
                          className={`link`}
                          onClick={() =>
                            o({
                              ...t,
                              actividad_id: e.id,
                            })
                          }
                        >{`Editar`}</button>
                        {` `}
                        <button
                          className={`link`}
                          onClick={() =>
                            d({
                              cmd: `seg_paso_borrar`,
                              id: t.id,
                              texto: `Paso «${t.paso}».`,
                            })
                          }
                        >{`Borrar`}</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5}>
                      <button
                        className={`btn`}
                        onClick={() =>
                          o({
                            actividad_id: e.id,
                          })
                        }
                      >{`+ Paso`}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </li>
        ))}
      </ul>
      <div className={`sg-gest-cab`}>
        <h3>{`Calendario`}</h3>
        <button
          className={`primary`}
          onClick={() =>
            c({
              fecha: ``,
              texto: ``,
              proyectos: [],
            })
          }
        >{`+ Evento`}</button>
      </div>
      <table className={`tabla`}>
        <tbody>
          {t.eventos.map((e) => (
            <tr key={e.id}>
              <td>{e.fecha}</td>
              <td>{e.texto}</td>
              <td className={`muted`}>{e.proyectos.join(`, `)}</td>
              <td>
                <button
                  className={`link`}
                  onClick={() => c(e)}
                >{`Editar`}</button>
                {` `}
                <button
                  className={`link`}
                  onClick={() =>
                    d({
                      cmd: `seg_evento_borrar`,
                      id: e.id,
                      texto: `Evento «${e.texto}».`,
                    })
                  }
                >{`Borrar`}</button>
              </td>
            </tr>
          ))}
          {!t.eventos.length && (
            <tr>
              <td className={`muted`}>{`Sin eventos.`}</td>
            </tr>
          )}
        </tbody>
      </table>
      {r && (
        <div className={`modal-fondo`}>
          <form
            className={`modal card`}
            onSubmit={async (e) => {
              e.preventDefault(),
                (await v(`seg_actividad_guardar`, r, `Actividad guardada.`)) &&
                  i(null);
            }}
          >
            <h3>{r.id ? `Editar actividad` : `Nueva actividad`}</h3>
            {[
              [`codigo`, `Código`, !0],
              [`nombre`, `Nombre`, !0],
              [`tab`, `Proyecto / pestaña`, !1],
              [`sigla`, `Sigla`, !1],
              [`responsable`, `Responsable`, !1],
              [`inicio`, `Inicio`, !1],
              [`fin`, `Fin`, !1],
              [`notas`, `Notas`, !1],
            ].map(([e, t, n]) => (
              <label key={e}>
                {t}
                <input
                  required={n}
                  type={e === `inicio` || e === `fin` ? `date` : `text`}
                  value={r[e]}
                  onChange={(t) =>
                    i({
                      ...r,
                      [e]: t.target.value,
                    })
                  }
                />
              </label>
            ))}
            <div className={`actions`}>
              <button
                type={`button`}
                className={`btn`}
                onClick={() => i(null)}
              >{`Cancelar`}</button>
              <button className={`primary`}>{`Guardar`}</button>
            </div>
          </form>
        </div>
      )}
      {a && (
        <div className={`modal-fondo`}>
          <form
            className={`modal card`}
            onSubmit={async (e) => {
              e.preventDefault(),
                (await v(`seg_paso_guardar`, a, `Paso guardado.`)) && o(null);
            }}
          >
            <h3>{a.id ? `Editar paso` : `Nuevo paso`}</h3>
            <label>
              {`Paso`}
              <input
                required={!0}
                value={a.paso ?? ``}
                onChange={(e) =>
                  o({
                    ...a,
                    paso: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Fecha`}
              <input
                type={`date`}
                value={a.fecha ?? ``}
                onChange={(e) =>
                  o({
                    ...a,
                    fecha: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Estado`}
              <select
                value={a.estado ?? `Sin iniciar`}
                onChange={(e) =>
                  o({
                    ...a,
                    estado: e.target.value,
                  })
                }
              >
                {nt.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </label>
            <label>
              {`Responsable`}
              <input
                value={a.responsable ?? ``}
                onChange={(e) =>
                  o({
                    ...a,
                    responsable: e.target.value,
                  })
                }
              />
            </label>
            <div className={`actions`}>
              <button
                type={`button`}
                className={`btn`}
                onClick={() => o(null)}
              >{`Cancelar`}</button>
              <button className={`primary`}>{`Guardar`}</button>
            </div>
          </form>
        </div>
      )}
      {s && (
        <div className={`modal-fondo`}>
          <form
            className={`modal card`}
            onSubmit={async (e) => {
              e.preventDefault(),
                (await v(`seg_evento_guardar`, s, `Evento guardado.`)) &&
                  c(null);
            }}
          >
            <h3>{s.id ? `Editar evento` : `Nuevo evento`}</h3>
            <label>
              {`Fecha`}
              <input
                required={!0}
                type={`date`}
                value={s.fecha ?? ``}
                onChange={(e) =>
                  c({
                    ...s,
                    fecha: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Texto`}
              <input
                required={!0}
                value={s.texto ?? ``}
                onChange={(e) =>
                  c({
                    ...s,
                    texto: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Proyectos (separados por coma)`}
              <input
                value={(s.proyectos ?? []).join(`, `)}
                onChange={(e) =>
                  c({
                    ...s,
                    proyectos: e.target.value.split(`,`).map((e) => e.trim()),
                  })
                }
              />
            </label>
            <div className={`actions`}>
              <button
                type={`button`}
                className={`btn`}
                onClick={() => c(null)}
              >{`Cancelar`}</button>
              <button className={`primary`}>{`Guardar`}</button>
            </div>
          </form>
        </div>
      )}
      {u &&
        createElement(ot, {
          texto: u.texto + ` Queda en la auditoría y no se reimporta.`,
          no: () => d(null),
          si: async () => {
            await v(
              u.cmd,
              {
                id: u.id,
                confirmar: !0,
              },
              `Borrado.`,
            ),
              d(null);
          },
        })}
    </section>
  );
}
var lt = [`#374151`, `#6b7280`, `#9ca3af`, `#4b5563`, `#1f2937`],
  ut = {
    vencida: `#b91c1c`,
    proxima: `#b45309`,
    avance: `#15803d`,
    sin_avance: `#9ca3af`,
  },
  dt = (e) => (e ? e.slice(0, 10).split(`-`).reverse().join(`/`) : `—`),
  ft = (e) => (e ? e.slice(8, 10) + `/` + e.slice(5, 7) : `—`),
  pt = (e) => (e === 0 ? `hoy` : e < 0 ? `hace ${-e} d` : `en ${e} d`),
  mt = (e) =>
    e
      .normalize(`NFD`)
      .replace(/[\u0300-\u036f]/g, ``)
      .toLowerCase(),
  ht = `seguimiento.diarios.orden`,
  gt = [
    `Actualizaciones`,
    `Calendario`,
    `Indicadores`,
    `Pendientes`,
    `Documentos`,
    `Bitácora`,
    `Diarios`,
    `Gestionar`,
    `Importar`,
  ];
function _t({ v: e, prog: t, col: n }) {
  return (
    <span className={`sg-barra`}>
      {t !== void 0 && (
        <i
          className={`prog`}
          style={{
            width: `${Math.min(100, t * 100)}%`,
          }}
        />
      )}
      <i
        style={{
          width: `${Math.min(100, e * 100)}%`,
          background: n,
        }}
      />
    </span>
  );
}
function vt(e) {
  return e === `Verde`
    ? `#15803d`
    : e === `Amarillo`
      ? `#b45309`
      : e === `Rojo`
        ? `#b91c1c`
        : `#9ca3af`;
}
function PantallaSeguimiento() {
  let [e, t] = useState(null),
    [n, r] = useState(null),
    [i, a] = useState({}),
    [o, s] = useState(`General`),
    [c, u] = useState(0),
    [d, f] = useState(!1),
    [m, h] = useState({}),
    [g, _] = useState({
      q: ``,
      estado: ``,
      unidad: ``,
      resp: ``,
    }),
    [v, y] = useState(`todas`),
    [b, x] = useState({
      GEN: !0,
      SEP: !0,
    }),
    [S, C] = useState(``),
    [w, T] = useState(``),
    [E, D] = useState(``),
    [ee, te] = useState(``),
    [ne, ie] = useState(``),
    [oe, se] = useState(``),
    [ce, ue] = useState(!1),
    [de, fe] = useState(null),
    [pe, me] = useState(null),
    [he, _e] = useState(() =>
      localStorage.getItem(ht) === `asc` ? `asc` : `desc`,
    ),
    [ve, ye] = useState(``),
    { cambios: j } = le();
  useEffect(() => {
    let e = () => u((e) => e + 1);
    return (
      window.addEventListener(`proyecto`, e),
      () => window.removeEventListener(`proyecto`, e)
    );
  }, []),
    useEffect(() => {
      let e = !0;
      return (
        (async () => {
          f(!0);
          let [n, i, o] = await Promise.all([
            window.ocr.seguimiento.datos(),
            window.ocr.call(`tablero`, {}).catch(() => null),
            window.ocr.seguimiento.local(),
          ]);
          e && (t(n), r(i), a(o || {}), f(!1));
        })(),
        () => {
          e = !1;
        }
      );
    }, [c]);
  let M = useMemo(
      () => (e ? fusionarSeguimiento(e, n, i, j) : null),
      [e, n, i, j],
    ),
    N = useCallback(async (e, t) => {
      a(e),
        await window.ocr.seguimiento.guardarLocal(e),
        ye(t + ` (guardado en la base local)`),
        setTimeout(() => ye(``), 3e3);
    }, []);
  if (!e) return <div className={`muted`}>{`Cargando seguimiento…`}</div>;
  let be = () => u((e) => e + 1);
  if (!M || e.vacio)
    return (
      <div className={`sg`}>
        <div className={`aviso`}>
          <b>{`Seguimiento vacío.`}</b>
          {` Este proyecto aún no tiene actividades. Cárgalas con «Cargar Excel» o créalas aquí mismo con «+ Actividad».`}
        </div>
        {createElement(at, {
          sugerida: e.fuente_sugerida,
          onCambio: be,
        })}
        {createElement(ct, {
          onCambio: be,
        })}
      </div>
    );
  let P = M.d,
    xe = e.presentacion ?? {},
    F = (e) => xe.nombres_cortos?.[e.sigla ?? ``] ?? e.nombre,
    I = (e) =>
      xe.colores?.[e ?? ``] ??
      lt[
        Math.max(
          0,
          P.proyectos.findIndex((t) => t.sigla === e),
        ) % lt.length
      ],
    L = o === `General` ? void 0 : P.proyectos.find((e) => e.proyecto === o),
    Se = (e, t) =>
      (P.fueraAlcance ?? []).some((n) => n.codigo === e && n.u === t) ||
      (P.unidadesFuera ?? []).includes(t),
    Ce = (e) => ({
      docs: M.documentos.filter((t) => (t.actividades || []).includes(e)),
      obs: M.observaciones[e] ?? [],
    }),
    we = Object.keys(M.snapshots).sort(),
    Te = we.filter((e) => e < P.corte),
    Ee = w === `no` ? null : (M.snapshots[w || Te[Te.length - 1]] ?? null),
    De = (e) => {
      if (
        (g.q &&
          !mt(e.codigo + ` ` + e.actividad + ` ` + e.quien).includes(
            mt(g.q),
          )) ||
        (g.estado && e.estado !== g.estado)
      )
        return !1;
      let t = P.porUnidad[e.codigo] ?? [];
      return !(
        (g.unidad && !t.some((e) => e.u === g.unidad)) ||
        (g.resp &&
          !t.some((e) => mt(e.per + ` ` + e.resp).includes(mt(g.resp))))
      );
    },
    Oe =
      M.pendientes.length +
      M.nuevas.filter((e) => !/cerrad|hecho|terminad/i.test(e.estado)).length,
    ke = Array.from(
      new Set(
        Object.values(P.porUnidad)
          .flat()
          .map((e) => e.u),
      ),
    ).sort(),
    Ae = (e, t) => {
      s(e),
        se(``),
        t &&
          (h((e) => ({
            ...e,
            [t]: !0,
          })),
          setTimeout(
            () =>
              document.getElementById(`sg-act-` + t)?.scrollIntoView({
                block: `center`,
              }),
            50,
          ));
    },
    je = (e, t) => (
      <div className={`sg-hero`}>
        <div>
          <small>{t}</small>
          <b>{A(e.pct_real)}</b>
          <small>
            {`programado `}
            {A(e.pct_programado)}
            {` · brecha `}
            {Math.round(e.brecha * 100)}
            {` pts`}
          </small>
        </div>
        <span
          className={`sg-sem`}
          style={{
            background: vt(e.semaforo),
          }}
        >
          {e.semaforo}
        </span>
      </div>
    ),
    Me = (e) => (
      <button
        className={`sg-tarj`}
        style={{
          borderTopColor: I(e.sigla),
        }}
        onClick={() => Ae(e.proyecto)}
        key={e.proyecto}
      >
        <div className={`t-cab`}>
          <span>{e.proyecto}</span>
          <small>{F(e)}</small>
        </div>
        <div className={`t-num`}>{A(e.pct_real)}</div>
        {createElement(_t, {
          v: e.pct_real,
          prog: e.pct_programado,
          col: I(e.sigla),
        })}
        <div className={`t-pie`}>
          <span>
            {`prog. `}
            {A(e.pct_programado)}
          </span>
          <span>
            {e.terminadas}
            {`/`}
            {e.actividades}
            {` terminadas`}
          </span>
          <span className={e.vencidas ? `r` : ``}>
            {e.vencidas}
            {` vencidas`}
          </span>
          <span>
            {e.proximas}
            {` próximas`}
          </span>
          <span>
            {e.sin_estado}
            {` sin estado`}
          </span>
        </div>
      </button>
    ),
    Ne = (e) => {
      let t = Ce(e.codigo),
        n = M.bitacora.filter((t) => t.nota.includes(e.codigo)),
        r = M.secuencias[e.codigo];
      return (
        <div className={`sg-det`}>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Unidad`}</th>
                <th>{`Estado`}</th>
                <th>{`Inicio`}</th>
                <th>{`Fin`}</th>
                <th>{`Responsable`}</th>
                <th>{`%`}</th>
              </tr>
            </thead>
            <tbody>
              {(P.porUnidad[e.codigo] ?? []).map((t) => (
                <tr className={Se(e.codigo, t.u) ? `fuera` : ``} key={t.u}>
                  <td>
                    {t.u}
                    {t.unidad ? (
                      <small>
                        {` · `}
                        {t.unidad}
                      </small>
                    ) : null}
                  </td>
                  <td>
                    {t.estado || `Sin estado`}
                    {t.alerta && (
                      <span
                        className={
                          `pill ` + (t.alerta === `Vencida` ? `p-r` : `p-a`)
                        }
                      >
                        {t.alerta}
                      </span>
                    )}
                  </td>
                  <td>{dt(t.ini)}</td>
                  <td>{dt(t.fin)}</td>
                  <td>
                    {t.per}
                    <small>
                      {` · `}
                      {t.resp}
                    </small>
                  </td>
                  <td>{A(t.pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {r && Pe(r.codigo)}
          <h4>{`Observaciones`}</h4>
          {t.obs.length ? (
            <ul className={`sg-lista`}>
              {t.obs.map((e, t) => (
                <li key={t}>
                  {e.fecha && (
                    <b>
                      {dt(e.fecha)}
                      {` `}
                    </b>
                  )}
                  {e.texto}
                  <small>
                    {` `}
                    {e.autor}
                    {e.u ? ` · ` + e.u : ``}
                    {e.local ? ` · local` : ``}
                    {e.ia ? ` · IA` : ``}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`muted`}>{`Sin observaciones.`}</p>
          )}
          <form
            className={`sg-obs`}
            onSubmit={(t) => {
              t.preventDefault();
              let n = new FormData(t.currentTarget),
                r = String(n.get(`texto`) || ``).trim();
              if (!r) return;
              let a = {
                fecha: new Date().toISOString().slice(0, 10),
                texto: r,
                autor: String(n.get(`autor`) || `Equipo`),
                u: String(n.get(`u`) || ``),
              };
              N(
                {
                  ...i,
                  obs: {
                    ...(i.obs ?? {}),
                    [e.codigo]: [...(i.obs?.[e.codigo] ?? []), a],
                  },
                },
                `Observación agregada`,
              ),
                t.currentTarget.reset();
            }}
          >
            <select name={`u`} defaultValue={``}>
              <option value={``}>{`Toda la actividad`}</option>
              {e.unidades.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
            <input name={`autor`} placeholder={`Nombre`} />
            <input name={`texto`} placeholder={`Agregar una observación…`} />
            <button type={`submit`}>{`Agregar`}</button>
          </form>
          <h4>{`Documentos y minutas`}</h4>
          {t.docs.length ? (
            <ul className={`sg-lista`}>
              {t.docs.map((e) => (
                <li key={e.codigo}>
                  <b>{e.codigo}</b>
                  {` `}
                  {e.titulo}
                  {` `}
                  <small>
                    {e.tipo}
                    {` · `}
                    {dt(e.fecha)}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`muted`}>{`Sin documentos ligados.`}</p>
          )}
          {n.length > 0 && (
            <>
              <h4>{`En la bitácora`}</h4>
              <ul className={`sg-lista`}>
                {n.map((e, t) => (
                  <li key={t}>
                    <b>{e.fecha}</b>
                    {` `}
                    {e.nota}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    },
    Pe = (e) => {
      let t = M.secuencias[e];
      return t ? (
        <div className={`sg-secu`}>
          <div className={`s-cab`}>
            <b className={`sg-cod`}>{t.codigo}</b>
            {` `}
            {t.nombre}
            <span>
              {t.hechos}
              {`/`}
              {t.total}
              {` · `}
              {A(t.pct)}
            </span>
          </div>
          {createElement(_t, {
            v: t.pct,
            col: `#374151`,
          })}
          <ul>
            {t.pasos.map((t, n) => (
              <li className={t.hecho ? `ok` : ``} key={n}>
                <i className={`dot`} />
                <span className={`txt`}>
                  {t.paso}
                  {t.ocr && (
                    <span
                      className={`tag`}
                      title={`Leído automáticamente de las encuestas escaneadas`}
                    >{`Lectura`}</span>
                  )}
                  {t.local && <span className={`tag`}>{`local`}</span>}
                  {t.ia && <span className={`tag ia`}>{`IA`}</span>}
                  <small>
                    {t.fecha}
                    {t.detalle ? ` · ` + t.detalle : ``}
                  </small>
                </span>
                {t.ocr ? (
                  <span className={`muted`}>{t.estado}</span>
                ) : (
                  <select
                    value={t.estado}
                    onChange={(n) => {
                      N(
                        {
                          ...i,
                          pasos: {
                            ...(i.pasos ?? {}),
                            [e + `|` + t.paso]: n.target.value,
                          },
                        },
                        `Paso actualizado`,
                      ),
                        window.ocr.call(`cambio_manual`, {
                          tipo: `paso`,
                          actividad: e,
                          paso: t.paso,
                          antes: t.estado,
                          despues: n.target.value,
                          texto: `${t.paso}: ${t.estado} → ${n.target.value}`,
                          usuario: `usuario`,
                        });
                    }}
                  >
                    {Array.from(
                      new Set([
                        ``,
                        `Pendiente`,
                        ...P.estados.map((e) => e[0]),
                        `Hecho`,
                        `Cancelado`,
                        t.estado,
                      ]),
                    ).map((e) => (
                      <option value={e} key={e}>
                        {e || `—`}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null;
    },
    Fe = (e) => {
      let t = P.actividades.filter((t) => t.proyecto === e.proyecto).filter(De),
        n = (P.fueraAlcance ?? []).filter((t) => t.proyecto === e.proyecto);
      return (
        <div className={`sg-grupo`} key={e.proyecto}>
          <div
            className={`g-cab`}
            style={{
              borderLeftColor: I(e.sigla),
            }}
          >
            <span>
              {e.proyecto}
              {` · `}
              {F(e)}
            </span>
            <small>
              {`real `}
              {A(e.pct_real)}
              {` · prog. `}
              {A(e.pct_programado)}
            </small>
          </div>
          {!t.length && (
            <p className={`muted`}>{`Ninguna actividad con estos filtros.`}</p>
          )}
          {t.map((e) => {
            let t = ut[e.estado] ?? `#9ca3af`,
              n = !!m[e.codigo],
              r = Ce(e.codigo);
            return (
              <div id={`sg-act-` + e.codigo} key={e.codigo}>
                <div
                  className={`sg-act`}
                  role={`button`}
                  tabIndex={0}
                  aria-expanded={n}
                  onClick={() =>
                    h((t) => ({
                      ...t,
                      [e.codigo]: !n,
                    }))
                  }
                  onKeyDown={(t) => {
                    t.key === `Enter` &&
                      h((t) => ({
                        ...t,
                        [e.codigo]: !n,
                      }));
                  }}
                >
                  <i
                    className={`dot`}
                    style={{
                      background: t,
                    }}
                  />
                  <span className={`sg-cod`}>{e.codigo}</span>
                  <span className={`txt`}>
                    <span className={`nom`}>{e.actividad}</span>
                    <small className={e.estado === `vencida` ? `r` : ``}>
                      {[e.est_txt, e.fin_txt, e.alerta, e.quien]
                        .filter(Boolean)
                        .join(` · `)}
                      {r.obs.length > 0 && (
                        <span className={`tag`}>
                          {r.obs.length}
                          {` obs.`}
                        </span>
                      )}
                      {r.docs.length > 0 && (
                        <span className={`tag`}>
                          {r.docs.length}
                          {` doc.`}
                        </span>
                      )}
                      {M.secuencias[e.codigo]?.pasos.some((e) => e.ocr) && (
                        <span
                          className={`tag`}
                          title={`Leído automáticamente de las encuestas escaneadas`}
                        >{`Lectura`}</span>
                      )}
                    </small>
                  </span>
                  {createElement(_t, {
                    v: e.pct,
                    col: t,
                  })}
                  <span
                    className={`pct`}
                    style={{
                      color: t,
                    }}
                  >
                    {A(e.pct)}
                  </span>
                </div>
                {n && Ne(e)}
              </div>
            );
          })}
          {n.length > 0 && (
            <div className={`sg-fuera`}>
              <span className={`tag`}>{`FUERA DE ALCANCE`}</span>
              {` No cuentan en el avance:`}
              <ul>
                {n.map((e, t) => (
                  <li key={t}>
                    {e.codigo}
                    {` · `}
                    {e.u}
                    {` `}
                    {e.unidad}
                    {` — `}
                    {e.estado}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    },
    Ie = () => {
      let e = P.actividades.filter((e) => !L || e.proyecto === L.proyecto);
      return (
        <div className={`sg-herr`}>
          <input
            placeholder={`Buscar actividad, código o responsable`}
            value={g.q}
            onChange={(e) =>
              _({
                ...g,
                q: e.target.value,
              })
            }
          />
          <select
            value={g.estado}
            onChange={(e) =>
              _({
                ...g,
                estado: e.target.value,
              })
            }
          >
            <option value={``}>{`Todos los estados`}</option>
            <option value={`vencida`}>{`Vencidas`}</option>
            <option value={`proxima`}>{`Próximas`}</option>
            <option value={`avance`}>{`En tiempo con avance`}</option>
            <option value={`sin_avance`}>{`Sin avance o sin fecha`}</option>
          </select>
          <select
            value={g.unidad}
            onChange={(e) =>
              _({
                ...g,
                unidad: e.target.value,
              })
            }
          >
            <option value={``}>{`Todas las unidades`}</option>
            {ke.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
          <input
            placeholder={`Responsable`}
            value={g.resp}
            onChange={(e) =>
              _({
                ...g,
                resp: e.target.value,
              })
            }
          />
          <small className={`muted`}>
            {e.filter(De).length}
            {` de `}
            {e.length}
          </small>
          {(g.q || g.estado || g.unidad || g.resp) && (
            <button
              onClick={() =>
                _({
                  q: ``,
                  estado: ``,
                  unidad: ``,
                  resp: ``,
                })
              }
            >{`Limpiar`}</button>
          )}
        </div>
      );
    },
    Le = () => {
      let e = (e) => e.filter((e) => o === `General` || e.proyecto === o),
        t = e(P.vencidas),
        n = e(P.proximas),
        r = t.reduce((e, t) => e + t.n, 0),
        i = n.reduce((e, t) => e + t.n, 0),
        a = (e, t) => (
          <li
            className={`sg-al`}
            onClick={() => Ae(e.proyecto, e.codigo)}
            key={e.codigo + t}
          >
            <span className={`pill ` + (t ? `p-r` : `p-a`)}>{pt(e.dias)}</span>
            <span>
              <b>{e.actividad}</b>
              <small>
                {e.codigo}
                {` · `}
                {t ? `venció` : `vence`}
                {` `}
                {ft(e.fin)}
                {` · `}
                {e.quien}
              </small>
            </span>
          </li>
        );
      return (
        <section className={`sg-sec`}>
          <div className={`sg-seg`}>
            {[
              [`todas`, `Todas`],
              [`venc`, `Vencidas · ` + r],
              [`prox`, `Próximas · ` + i],
            ].map(([e, t]) => (
              <button
                className={v === e ? `on` : ``}
                onClick={() => y(e)}
                key={e}
              >
                {t}
              </button>
            ))}
          </div>
          {v !== `prox` && (
            <>
              <h3>
                {`Vencidas (`}
                {r}
                {` actividades)`}
              </h3>
              <ul className={`sg-lista`}>
                {t.length ? (
                  t.map((e) => a(e, !0))
                ) : (
                  <li className={`muted`}>{`Ninguna vencida.`}</li>
                )}
              </ul>
            </>
          )}
          {v !== `venc` && (
            <>
              <h3>
                {`Próximas a vencer en `}
                {P.diasLista}
                {` días (`}
                {i}
                {` actividades)`}
              </h3>
              <ul className={`sg-lista`}>
                {n.length ? (
                  n.map((e) => a(e, !1))
                ) : (
                  <li className={`muted`}>
                    {`Nada vence en los próximos `}
                    {P.diasLista}
                    {` días.`}
                  </li>
                )}
              </ul>
            </>
          )}
        </section>
      );
    },
    Re = () => {
      let e = k(P.corte),
        t = [
          ...M.pendientes
            .filter((t) => t.vence && k(t.vence) >= e && k(t.vence) <= e + 7)
            .map((e) => ({
              f: e.vence,
              t: e.tarea,
              q: e.persona,
              c: e.codigo,
            })),
          ...M.eventos
            .filter((t) => k(t.fecha) >= e && k(t.fecha) <= e + 7)
            .map((e) => ({
              f: e.fecha,
              t: e.texto,
              q: e.p ?? ``,
              c: ``,
            })),
          ...P.proximas.map((e) => ({
            f: e.fin,
            t: e.actividad,
            q: e.quien,
            c: e.codigo,
          })),
        ].sort((e, t) => e.f.localeCompare(t.f));
      return (
        <section className={`sg-sec`}>
          <h3>{`Ruta de la semana`}</h3>
          <ul className={`sg-ruta`}>
            {t.length ? (
              t.map((e, t) => (
                <li key={t}>
                  <b>{ft(e.f)}</b>
                  <span>
                    {e.t}
                    <small>{[e.c, e.q].filter(Boolean).join(` · `)}</small>
                  </span>
                </li>
              ))
            ) : (
              <li
                className={`muted`}
              >{`Nada programado en los próximos 7 días.`}</li>
            )}
          </ul>
        </section>
      );
    },
    ze = () => (
      <section className={`sg-sec`}>
        <h3>{`Pendientes del equipo`}</h3>
        <div className={`sg-equipo`}>
          {M.personas.map((e) => {
            let t = M.pendientes.filter((t) => t.persona === e),
              n = t.filter((e) => e.vence && k(e.vence) < k(P.corte)).length;
            return (
              <button
                onClick={() => {
                  ie(e), s(`Pendientes`);
                }}
                key={e}
              >
                <span className={`av`}>
                  {e
                    .split(` `)
                    .map((e) => e[0])
                    .slice(0, 2)
                    .join(``)}
                </span>
                <span>
                  {e}
                  <small>
                    {t.length}
                    {` pendientes`}
                    {n ? ` · ${n} vencidos` : ``}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    ),
    Be = (
      <div className={`sg-ley`}>
        {[
          [`Vencida`, ut.vencida],
          [`Vence en ${P.dias} días o menos`, ut.proxima],
          [`En tiempo con avance`, ut.avance],
          [`Sin avance o sin fecha`, ut.sin_avance],
        ].map(([e, t]) => (
          <span key={e}>
            <i
              className={`dot`}
              style={{
                background: t,
              }}
            />
            {e}
          </span>
        ))}
        {(P.fueraAlcance ?? []).length > 0 && (
          <span>
            <i
              className={`dot`}
              style={{
                background: `#d1d5db`,
              }}
            />
            {`Fuera de alcance: no cuenta`}
          </span>
        )}
      </div>
    ),
    Ve = () => {
      let e = Object.values(P.porUnidad)
          .flat()
          .flatMap((e) => [e.ini, e.fin])
          .filter(Boolean),
        t = Math.min(...e.map(k)),
        n = Math.max(...e.map(k)),
        r = Math.max(1, n - t),
        i = (e) => ((k(e) - t) / r) * 100,
        a = i(P.corte),
        o = [];
      for (let e = t; e <= n; ) {
        let i = new Date(e * 864e5),
          a = i.getUTCDate(),
          s =
            a <= 15
              ? Date.UTC(i.getUTCFullYear(), i.getUTCMonth(), 15) / 864e5
              : Date.UTC(i.getUTCFullYear(), i.getUTCMonth() + 1, 0) / 864e5;
        o.push({
          l:
            (a <= 15 ? `1ª ` : `2ª `) +
            i.toLocaleString(`es-MX`, {
              month: `short`,
              timeZone: `UTC`,
            }),
          a: ((e - t) / r) * 100,
          b: ((Math.min(s, n) - e + 1) / r) * 100,
        }),
          (e = s + 1);
      }
      let s = (e) => b[e.sigla ?? ``] !== !1;
      return (
        <section className={`sg-sec`}>
          <div className={`sg-seg`}>
            {P.proyectos.map((e) => (
              <label key={e.proyecto}>
                <input
                  type={`checkbox`}
                  checked={s(e)}
                  onChange={(t) =>
                    x({
                      ...b,
                      [e.sigla ?? ``]: t.target.checked,
                    })
                  }
                />
                {` `}
                {F(e)}
              </label>
            ))}
            <label>
              <input
                type={`checkbox`}
                checked={b.GEN}
                onChange={(e) =>
                  x({
                    ...b,
                    GEN: e.target.checked,
                  })
                }
              />
              {` `}
              {`General`}
            </label>
            <label>
              <input
                type={`checkbox`}
                checked={b.SEP}
                onChange={(e) =>
                  x({
                    ...b,
                    SEP: e.target.checked,
                  })
                }
              />
              {` `}
              {`Calendario externo`}
            </label>
          </div>
          <div className={`sg-gantt`}>
            <div className={`g-row g-head`}>
              <span />
              <div className={`g-track`}>
                {o.map((e, t) => (
                  <span
                    style={{
                      left: e.a + `%`,
                      width: e.b + `%`,
                    }}
                    key={t}
                  >
                    {e.l}
                  </span>
                ))}
              </div>
            </div>
            {P.proyectos.filter(s).map((e) => (
              <div key={e.proyecto}>
                <div
                  className={`g-grp`}
                  style={{
                    borderLeftColor: I(e.sigla),
                  }}
                >
                  {e.proyecto}
                  {` · `}
                  {F(e)}
                  {` `}
                  <small>
                    {`real `}
                    {A(e.pct_real)}
                    {` · prog. `}
                    {A(e.pct_programado)}
                  </small>
                </div>
                {P.actividades
                  .filter((t) => t.proyecto === e.proyecto)
                  .filter(De)
                  .map((t) => {
                    let n = (P.porUnidad[t.codigo] ?? []).filter(
                      (e) => e.ini && e.fin,
                    );
                    if (!n.length) return null;
                    let r = Math.min(...n.map((e) => i(e.ini))),
                      o = Math.max(...n.map((e) => i(e.fin)));
                    return (
                      <div
                        className={`g-row`}
                        onClick={() => Ae(e.proyecto, t.codigo)}
                        title={t.actividad}
                        key={t.codigo}
                      >
                        <span className={`sg-cod`}>{t.codigo}</span>
                        <div className={`g-track`}>
                          <i
                            className={`g-bar`}
                            style={{
                              left: r + `%`,
                              width: Math.max(0.8, o - r) + `%`,
                              borderColor: ut[t.estado],
                            }}
                          >
                            <i
                              style={{
                                width: t.pct * 100 + `%`,
                                background: ut[t.estado],
                              }}
                            />
                          </i>
                          <i
                            className={`g-hoy`}
                            style={{
                              left: a + `%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {M.nuevas
                  .filter(
                    (t) =>
                      P.proyectos.find((e) => e.sigla === t.proyecto)
                        ?.proyecto === e.proyecto && t.inicio,
                  )
                  .map((e) => (
                    <div className={`g-row`} key={e.id}>
                      <span className={`sg-cod`}>
                        {`★ `}
                        {e.id}
                      </span>
                      <div className={`g-track`}>
                        <i
                          className={`g-bar nueva`}
                          style={{
                            left: i(e.inicio) + `%`,
                            width:
                              Math.max(
                                0.8,
                                i(e.vence || e.inicio) - i(e.inicio),
                              ) + `%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <h3>{`Eventos`}</h3>
          <ul className={`sg-lista`}>
            {M.eventos
              .filter((e) =>
                e.p === `SEP`
                  ? b.SEP
                  : e.p === `General` || !e.p
                    ? b.GEN
                    : b[e.p] !== !1,
              )
              .map((e, t) => (
                <li key={t}>
                  <b>{dt(e.fecha)}</b>
                  {` `}
                  {e.texto}
                  {` `}
                  <small>{e.p}</small>
                </li>
              ))}
          </ul>
        </section>
      );
    },
    He = () => {
      let e = (e) => !S || e === S,
        t = (e) => Ce(e).docs.length > 0,
        n = re(M, e, Ee, t, Se),
        r = [...we.map((e) => M.snapshots[e]), P].filter(
          (e, t, n) => n.findIndex((t) => t.corte === e.corte) === t,
        ),
        i = (e) =>
          S
            ? (e.proyectos.find((e) => e.proyecto === S)?.pct_real ?? 0)
            : e.total.pct_real,
        a = r.map((e, t) => [
          20 + (t * 280) / Math.max(1, r.length - 1),
          95 - i(e) * 80,
        ]),
        o = {};
      for (let [t, n] of Object.entries(P.porUnidad)) {
        let r = P.actividades.find((e) => e.codigo === t);
        if (r && e(r.proyecto))
          for (let e of n)
            Se(t, e.u) ||
              (o[e.estado || `Sin estado`] =
                (o[e.estado || `Sin estado`] ?? 0) + 1);
      }
      let s = Object.values(o).reduce((e, t) => e + t, 0) || 1,
        c = 0,
        l = {};
      for (let [t, n] of Object.entries(P.porUnidad)) {
        let r = P.actividades.find((e) => e.codigo === t);
        if (r && e(r.proyecto))
          for (let e of n) {
            let t = e.per || `Por definir`;
            (l[t] = l[t] ?? {
              n: 0,
              s: 0,
              venc: 0,
            }),
              l[t].n++,
              (l[t].s += e.pct),
              e.alerta === `Vencida` && l[t].venc++;
          }
      }
      return (
        <section className={`sg-sec`}>
          <div className={`sg-seg`}>
            <button
              className={S ? `` : `on`}
              onClick={() => C(``)}
            >{`Todos los proyectos`}</button>
            {P.proyectos.map((e) => (
              <button
                className={S === e.proyecto ? `on` : ``}
                onClick={() => C(e.proyecto)}
                key={e.proyecto}
              >
                {e.proyecto}
              </button>
            ))}
            <select
              value={w}
              onChange={(e) => T(e.target.value)}
              title={`Comparar contra`}
            >
              <option value={``}>{`Comparar con el corte previo`}</option>
              {Te.map((e) => (
                <option value={e} key={e}>
                  {`Comparar con `}
                  {dt(e)}
                </option>
              ))}
              <option value={`no`}>{`Sin comparación`}</option>
            </select>
          </div>
          <div className={`sg-kpis`}>
            {n.map((e) => (
              <article
                className={`sg-kpi`}
                style={{
                  borderTopColor: vt(e.sem),
                }}
                title={e.tip}
                key={e.id}
              >
                <div className={`k-top`}>
                  <span>{e.lab}</span>
                  <span
                    className={`k-sem`}
                    style={{
                      color: vt(e.sem),
                    }}
                  >
                    {`● `}
                    {e.sem}
                  </span>
                </div>
                <div className={`k-num`}>{e.corto}</div>
                <div className={`k-sub`}>{e.sub}</div>
                <div className={`k-tr ` + e.trCls}>{e.tr}</div>
                <div className={`k-regla`}>
                  <b>{`Semáforo:`}</b>
                  {` `}
                  {e.tip}
                </div>
              </article>
            ))}
          </div>
          {!S && (
            <table className={`sg-tabla`}>
              <thead>
                <tr>
                  <th>{`Proyecto`}</th>
                  {n.map((e) => (
                    <th key={e.id}>{e.lab}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {P.proyectos.map((e) => {
                  let r = re(M, (t) => t === e.proyecto, Ee, t, Se);
                  return (
                    <tr
                      onClick={() => C(e.proyecto)}
                      className={`clic`}
                      key={e.proyecto}
                    >
                      <td>
                        {e.proyecto}
                        {` `}
                        <small>{F(e)}</small>
                      </td>
                      {n.map((e) => {
                        let t = r.find((t) => t.id === e.id);
                        return (
                          <td key={e.id}>
                            <i
                              className={`dot`}
                              style={{
                                background: vt(t?.sem ?? ``),
                              }}
                            />
                            {t?.corto ?? `—`}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr className={`tot`}>
                  <td>{`Total`}</td>
                  {n.map((e) => (
                    <td key={e.id}>{e.corto}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
          <div className={`sg-graf`}>
            <figure>
              <figcaption>{`Avance real por corte`}</figcaption>
              <svg viewBox={`0 0 320 110`}>
                <polyline
                  points={a.map((e) => e.join(`,`)).join(` `)}
                  fill={`none`}
                  stroke={`#374151`}
                  strokeWidth={`2`}
                />
                {a.map((e, t) => (
                  <g key={t}>
                    <circle cx={e[0]} cy={e[1]} r={`3`} fill={`#374151`} />
                    <text x={e[0]} y={108} fontSize={`9`} textAnchor={`middle`}>
                      {ft(r[t].corte)}
                    </text>
                    <text
                      x={e[0]}
                      y={e[1] - 6}
                      fontSize={`9`}
                      textAnchor={`middle`}
                    >
                      {A(i(r[t]))}
                    </text>
                  </g>
                ))}
              </svg>
            </figure>
            <figure>
              <figcaption>{`Filas por estado`}</figcaption>
              <svg viewBox={`0 0 120 120`}>
                {Object.entries(o).map(([e, t], n) => {
                  let r = (c / s) * 2 * Math.PI;
                  c += t;
                  let i = (c / s) * 2 * Math.PI,
                    a = +(i - r > Math.PI),
                    o = (e, t) =>
                      `${60 + t * Math.sin(e)},${60 - t * Math.cos(e)}`;
                  return (
                    <path
                      d={`M${o(r, 50)} A50,50 0 ${a} 1 ${o(i - 1e-6, 50)} L${o(i - 1e-6, 28)} A28,28 0 ${a} 0 ${o(r, 28)} Z`}
                      fill={lt[n % lt.length]}
                      opacity={0.4 + (n % 4) * 0.15}
                      key={e}
                    >
                      <title>
                        {e}
                        {`: `}
                        {t}
                      </title>
                    </path>
                  );
                })}
              </svg>
              <ul className={`sg-ley v`}>
                {Object.entries(o).map(([e, t], n) => (
                  <li key={e}>
                    <i
                      className={`dot`}
                      style={{
                        background: lt[n % lt.length],
                        opacity: 0.4 + (n % 4) * 0.15,
                      }}
                    />
                    {e}
                    {`: `}
                    {t}
                  </li>
                ))}
              </ul>
            </figure>
            <figure>
              <figcaption>{`Avance por unidad`}</figcaption>
              {P.unidades
                .filter((t) => e(t.proyecto))
                .map((e) => (
                  <div className={`sg-bu`} key={e.proyecto + e.cod_unidad}>
                    <span>{e.cod_unidad}</span>
                    {createElement(_t, {
                      v: e.pct_real,
                      prog: e.pct_programado,
                      col: I(e.sigla),
                    })}
                    <small>{A(e.pct_real)}</small>
                  </div>
                ))}
            </figure>
          </div>
          <h3>{`Responsables`}</h3>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Persona`}</th>
                <th>{`Filas`}</th>
                <th>{`Avance`}</th>
                <th>{`Vencidas`}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(l)
                .sort((e, t) => t[1].n - e[1].n)
                .map(([e, t]) => (
                  <tr key={e}>
                    <td>{e}</td>
                    <td>{t.n}</td>
                    <td>{A(t.s / t.n)}</td>
                    <td className={t.venc ? `r` : ``}>{t.venc}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {Ee && (
            <>
              <h3>
                {`Cambios desde el `}
                {dt(Ee.corte)}
              </h3>
              <table className={`sg-tabla`}>
                <thead>
                  <tr>
                    <th>{`Actividad`}</th>
                    <th>{`Antes`}</th>
                    <th>{`Ahora`}</th>
                    <th>{`Δ`}</th>
                  </tr>
                </thead>
                <tbody>
                  {P.actividades
                    .filter((t) => e(t.proyecto))
                    .map((e) => ({
                      a: e,
                      b: Ee.actividades.find((t) => t.codigo === e.codigo),
                    }))
                    .filter(
                      (e) => e.b && Math.abs(e.a.pct - (e.b?.pct ?? 0)) > 1e-9,
                    )
                    .map(({ a: e, b: t }) => (
                      <tr key={e.codigo}>
                        <td>
                          {e.codigo}
                          {` `}
                          <small>{e.actividad}</small>
                        </td>
                        <td>{A(t?.pct)}</td>
                        <td>{A(e.pct)}</td>
                        <td className={e.pct >= (t?.pct ?? 0) ? `ok` : `r`}>
                          {Math.round((e.pct - (t?.pct ?? 0)) * 100)}
                          {` pts`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          <h3>{`Encuestas (hoja + lectura automática)`}</h3>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Proyecto`}</th>
                <th>{`Unidad`}</th>
                <th>{`Momento`}</th>
                <th>{`Formato`}</th>
                <th>{`Meta`}</th>
                <th>{`Aplicadas`}</th>
                <th>{`%`}</th>
              </tr>
            </thead>
            <tbody>
              {M.encuestas
                .filter(
                  (e) =>
                    !S ||
                    P.proyectos.find((e) => e.proyecto === S)?.sigla === e.p,
                )
                .map((e, t) => (
                  <tr key={t}>
                    <td>{e.p}</td>
                    <td>{e.u}</td>
                    <td>{e.m}</td>
                    <td>{e.i}</td>
                    <td>{e.meta ?? `—`}</td>
                    <td>
                      {e.apl ?? `—`}
                      {e.ocr && (
                        <span
                          className={`tag`}
                          title={`Leído automáticamente de las encuestas escaneadas`}
                        >{`Lectura`}</span>
                      )}
                    </td>
                    <td>
                      {e.meta && e.apl !== null ? A(e.apl / e.meta) : `—`}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      );
    },
    Ue = () => {
      let e = k(P.corte),
        t = mt(ne),
        n = M.pendientes.filter(
          (e) => !t || mt(Object.values(e).join(` `)).includes(t),
        ),
        r = Array.from(
          new Set([...M.personas, ...n.map((e) => e.persona)]),
        ).filter((e) => n.some((t) => t.persona === e));
      return (
        <section className={`sg-sec`}>
          <div className={`sg-herr`}>
            <input
              placeholder={`Buscar en pendientes`}
              value={ne}
              onChange={(e) => ie(e.target.value)}
            />
            <button
              className={`primary`}
              onClick={() => ue(!0)}
            >{`+ Agregar actividad`}</button>
          </div>
          {r.map((t) => (
            <div className={`sg-grupo`} key={t}>
              <div className={`g-cab`}>
                <span>{t}</span>
                <small>{n.filter((e) => e.persona === t).length}</small>
              </div>
              <table className={`sg-tabla`}>
                <thead>
                  <tr>
                    <th>{`Código`}</th>
                    <th>{`Tarea`}</th>
                    <th>{`Qué falta`}</th>
                    <th>{`Vence`}</th>
                    <th>{`Estado`}</th>
                  </tr>
                </thead>
                <tbody>
                  {n
                    .filter((e) => e.persona === t)
                    .map((t, n) => {
                      let r = t.vence && k(t.vence) < e;
                      return (
                        <tr key={n}>
                          <td>
                            {t.codigo && (
                              <a
                                href={`#`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  let n = P.actividades.find(
                                    (e) => e.codigo === t.codigo,
                                  )?.proyecto;
                                  n && Ae(n, t.codigo);
                                }}
                              >
                                {t.codigo}
                              </a>
                            )}
                          </td>
                          <td>{t.tarea}</td>
                          <td>{t.falta}</td>
                          <td className={r ? `r` : ``}>
                            {dt(t.vence)}
                            {r && (
                              <span className={`pill p-r`}>{`vencida`}</span>
                            )}
                          </td>
                          <td>{t.estado}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ))}
          <h3>{`Actividades nuevas`}</h3>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Código`}</th>
                <th>{`Título`}</th>
                <th>{`Proyecto`}</th>
                <th>{`Asignado a`}</th>
                <th>{`Inicio`}</th>
                <th>{`Fecha límite`}</th>
                <th>{`Estado`}</th>
              </tr>
            </thead>
            <tbody>
              {M.nuevas.map((e) => (
                <tr key={e.id}>
                  <td>
                    {e.id}
                    {e.local && <span className={`tag`}>{`local`}</span>}
                  </td>
                  <td>
                    {e.titulo}
                    <small>
                      {` `}
                      {e.descripcion}
                    </small>
                  </td>
                  <td>{e.proyecto}</td>
                  <td>{e.persona}</td>
                  <td>{dt(e.inicio)}</td>
                  <td>{dt(e.vence)}</td>
                  <td>{e.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    },
    We = () => (
      <div className={`sg-modal`} role={`dialog`} aria-modal={`true`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let t = Object.fromEntries(new FormData(e.currentTarget));
            if (!t.titulo?.trim()) return;
            let n = {
              id: `NL-` + String((i.nuevas?.length ?? 0) + 1).padStart(3, `0`),
              alta: new Date().toLocaleString(`es-MX`),
              titulo: t.titulo,
              proyecto: t.proyecto,
              persona: t.persona || `General`,
              inicio: t.inicio,
              vence: t.vence,
              descripcion: t.descripcion,
              estado: `Por confirmar`,
              registro: t.registro || `Equipo`,
              local: !0,
            };
            N(
              {
                ...i,
                nuevas: [...(i.nuevas ?? []), n],
              },
              `Actividad agregada`,
            ),
              ue(!1);
          }}
        >
          <h3>{`Agregar actividad`}</h3>
          <label>
            {`Título`}
            <input name={`titulo`} required={!0} />
          </label>
          <label>
            {`Proyecto`}
            <select name={`proyecto`}>
              {[
                ...P.proyectos.map((e) => e.sigla ?? e.proyecto),
                `General`,
              ].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </label>
          <label>
            {`Asignado a`}
            <select name={`persona`}>
              <option>{`General`}</option>
              {M.personas.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </label>
          <label>
            {`Inicio`}
            <input type={`date`} name={`inicio`} />
          </label>
          <label>
            {`Fecha límite`}
            <input type={`date`} name={`vence`} />
          </label>
          <label>
            {`Descripción`}
            <textarea name={`descripcion`} />
          </label>
          <label>
            {`Registró`}
            <input name={`registro`} />
          </label>
          <p
            className={`muted`}
          >{`Se guarda solo en este equipo; no se envía a la hoja ni se manda correo.`}</p>
          <div className={`actions`}>
            <button className={`primary`} type={`submit`}>{`Guardar`}</button>
            <button type={`button`} onClick={() => ue(!1)}>{`Cancelar`}</button>
          </div>
        </form>
      </div>
    ),
    Ge = () => {
      let e = mt(E),
        t = M.documentos.filter(
          (t) => !e || mt(Object.values(t).join(` `)).includes(e),
        ),
        n = (e) =>
          /borrador|revisi/i.test(e.titulo + e.notas)
            ? `En revisión`
            : /minuta|acta/i.test(e.tipo)
              ? `Firmado/registrado`
              : `Publicado`;
      return (
        <section className={`sg-sec`}>
          <div className={`sg-herr`}>
            <input
              placeholder={`Buscar documento`}
              value={E}
              onChange={(e) => D(e.target.value)}
            />
            <small className={`muted`}>
              {t.length}
              {` de `}
              {M.documentos.length}
            </small>
          </div>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Código`}</th>
                <th>{`Título`}</th>
                <th>{`Tipo`}</th>
                <th>{`Fecha`}</th>
                <th>{`Actividades`}</th>
                <th>{`Estado del documento`}</th>
                <th>{`Notas`}</th>
              </tr>
            </thead>
            <tbody>
              {t.map((e) => (
                <tr key={e.codigo}>
                  <td>{e.codigo}</td>
                  <td>
                    {e.url ? (
                      <a href={e.url} target={`_blank`} rel={`noreferrer`}>
                        {e.titulo}
                      </a>
                    ) : (
                      e.titulo
                    )}
                  </td>
                  <td>{e.tipo}</td>
                  <td>{dt(e.fecha)}</td>
                  <td>
                    {(e.actividades || []).map((e) => (
                      <a
                        href={`#`}
                        className={`tag`}
                        onClick={(t) => {
                          t.preventDefault();
                          let n = P.actividades.find(
                            (t) => t.codigo === e,
                          )?.proyecto;
                          n && Ae(n, e);
                        }}
                        key={e}
                      >
                        {e}
                      </a>
                    ))}
                  </td>
                  <td>{n(e)}</td>
                  <td>{e.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    },
    Ke = () => {
      let e = mt(ee),
        t = M.bitacora.filter(
          (t) => !e || mt(Object.values(t).join(` `)).includes(e),
        );
      return (
        <section className={`sg-sec`}>
          <div className={`sg-herr`}>
            <input
              placeholder={`Buscar en la bitácora`}
              value={ee}
              onChange={(e) => te(e.target.value)}
            />
            <small className={`muted`}>
              {t.length}
              {` de `}
              {M.bitacora.length}
            </small>
          </div>
          <ul className={`sg-bita`}>
            {t.map((e, t) => (
              <li key={t}>
                <div>
                  <b>{e.fecha}</b>
                  {` `}
                  <small>
                    {e.hora}
                    {` · `}
                    {e.proyecto}
                    {` · `}
                    {e.sede}
                    {` · `}
                    {e.tipo}
                  </small>
                </div>
                <p>{e.nota}</p>
                <small>
                  {e.autor}
                  {` · `}
                  {e.estado}
                  {` · uso: `}
                  {e.uso}
                </small>
              </li>
            ))}
          </ul>
        </section>
      );
    },
    qe = () => {
      let e = o.startsWith(`Diario:`) ? o.slice(7) : ``,
        t = M.diarios
          .filter((t) => !e || t.persona === e)
          .sort((e, t) =>
            he === `desc`
              ? t.fecha.localeCompare(e.fecha)
              : e.fecha.localeCompare(t.fecha),
          );
      return (
        <section className={`sg-sec`}>
          <div className={`sg-seg`}>
            <button
              className={e ? `` : `on`}
              onClick={() => s(`Diarios`)}
            >{`Todas las personas`}</button>
            {M.diarPersonas.map((t) => (
              <button
                className={e === t ? `on` : ``}
                onClick={() => s(`Diario:` + t)}
                key={t}
              >
                {t}
                {` · `}
                {M.diarios.filter((e) => e.persona === t).length}
              </button>
            ))}
            <button
              title={`Ordenar`}
              onClick={() => {
                let e = he === `desc` ? `asc` : `desc`;
                _e(e), localStorage.setItem(ht, e);
              }}
            >
              {he === `desc` ? `Z→A ↓` : `A→Z ↑`}
            </button>
            <button
              className={`primary`}
              onClick={() =>
                fe({
                  id: ``,
                  persona: e || M.diarPersonas[0] || ``,
                  proyecto: P.proyectos[0]?.sigla ?? ``,
                  fecha: P.corte,
                  actividad: ``,
                  notas: ``,
                  incidentes: ``,
                  registro: ``,
                  editado: ``,
                })
              }
            >{`+ Nueva entrada`}</button>
          </div>
          {t.length ? (
            t.map((e) => (
              <article className={`sg-diario`} key={e.id}>
                <div className={`d-cab`}>
                  <b>{e.id}</b>
                  {` `}
                  {dt(e.fecha)}
                  {` · `}
                  {e.persona}
                  {` · `}
                  {e.proyecto}
                  {e.local && <span className={`tag`}>{`local`}</span>}
                  <span className={`d-acc`}>
                    <button onClick={() => fe(e)}>{`Editar`}</button>
                    <button onClick={() => me(e)}>{`Borrar`}</button>
                  </span>
                </div>
                <div className={`d-act`}>{e.actividad}</div>
                <p>{e.notas}</p>
                {e.incidentes && (
                  <p className={`muted`}>
                    {`Incidentes: `}
                    {e.incidentes}
                  </p>
                )}
                <small className={`muted`}>
                  {`Registró `}
                  {e.registro}
                  {e.editado ? ` · editado ` + e.editado : ``}
                </small>
              </article>
            ))
          ) : (
            <p className={`muted`}>{`Sin entradas.`}</p>
          )}
        </section>
      );
    },
    Je = (e) => (
      <div className={`sg-modal`} role={`dialog`} aria-modal={`true`}>
        <form
          onSubmit={(t) => {
            t.preventDefault();
            let n = Object.fromEntries(new FormData(t.currentTarget)),
              r = new Date().toLocaleString(`es-MX`),
              a =
                e.id ||
                `DL-` + String((i.diarios?.length ?? 0) + 1).padStart(3, `0`),
              o = {
                ...e,
                ...n,
                id: a,
                registro: e.registro || n.registro || `Equipo`,
                editado: e.id ? r : ``,
                local: !0,
              },
              s = (i.diarios ?? []).filter((e) => e.id !== a);
            N(
              {
                ...i,
                diarios: [...s, o],
              },
              e.id ? `Entrada editada` : `Entrada agregada`,
            ),
              e.id ||
                ae({
                  tipo: `diario`,
                  nombre: `${a} · ${o.persona}`,
                  texto: [o.actividad, o.notas, o.incidentes].filter(Boolean)
                    .join(`
`),
                  ref: a,
                  usuario: o.registro,
                }),
              fe(null);
          }}
        >
          <h3>{e.id ? `Editar ` + e.id : `Nueva entrada de diario`}</h3>
          <label>
            {`Persona`}
            <select name={`persona`} defaultValue={e.persona}>
              {Array.from(new Set([...M.diarPersonas, ...M.personas])).map(
                (e) => (
                  <option key={e}>{e}</option>
                ),
              )}
            </select>
          </label>
          <label>
            {`Proyecto`}
            <select name={`proyecto`} defaultValue={e.proyecto}>
              {P.proyectos.map((e) => (
                <option key={e.proyecto}>{e.sigla}</option>
              ))}
            </select>
          </label>
          <label>
            {`Fecha`}
            <input
              type={`date`}
              name={`fecha`}
              defaultValue={e.fecha}
              required={!0}
            />
          </label>
          <label>
            {`Actividad / instrumento`}
            <input name={`actividad`} defaultValue={e.actividad} />
          </label>
          <label>
            {`Notas`}
            <textarea name={`notas`} defaultValue={e.notas} required={!0} />
          </label>
          <label>
            {`Incidentes`}
            <textarea name={`incidentes`} defaultValue={e.incidentes} />
          </label>
          <p
            className={`muted`}
          >{`Se guarda cifrado en este equipo. No se escribe en la hoja ni en los documentos del cliente. Las fotos no se suben desde aquí.`}</p>
          <div className={`actions`}>
            <button className={`primary`} type={`submit`}>{`Guardar`}</button>
            <button
              type={`button`}
              onClick={() => fe(null)}
            >{`Cancelar`}</button>
          </div>
        </form>
      </div>
    ),
    Ye = (e) => (
      <div className={`sg-modal`} role={`dialog`} aria-modal={`true`}>
        <form
          onSubmit={(t) => {
            if (
              (t.preventDefault(),
              String(new FormData(t.currentTarget).get(`c`) || ``) !==
                `CONFIRMAR`)
            )
              return ye(`Escriba CONFIRMAR para borrar`);
            let n = Number(localStorage.getItem(`seguimiento.ultBorrado`) || 0);
            if (Date.now() - n < 1e4) return ye(`Espere 10 s entre borrados`);
            localStorage.setItem(`seguimiento.ultBorrado`, String(Date.now()));
            let r = {
              ...e,
              estado: `Borrada`,
              borrada: `equipo · ` + new Date().toLocaleString(`es-MX`),
              local: !0,
            };
            N(
              {
                ...i,
                diarios: [...(i.diarios ?? []).filter((t) => t.id !== e.id), r],
              },
              `Entrada borrada (se conserva para restaurar)`,
            ),
              me(null);
          }}
        >
          <h3>
            {`Borrar `}
            {e.id}
          </h3>
          <p>
            {`El borrado es suave: la entrada se conserva marcada como «Borrada», con quién y cuándo. Escriba `}
            <b>{`CONFIRMAR`}</b>
            {`.`}
          </p>
          <input name={`c`} autoFocus={!0} />
          <div className={`actions`}>
            <button className={`primary`} type={`submit`}>{`Borrar`}</button>
            <button
              type={`button`}
              onClick={() => me(null)}
            >{`Cancelar`}</button>
          </div>
        </form>
      </div>
    ),
    Xe = () => {
      let e = mt(oe.trim());
      if (e.length < 2) return null;
      let t = P.actividades
          .filter((t) => mt(t.codigo + ` ` + t.actividad).includes(e))
          .slice(0, 8),
        n = M.pendientes
          .filter((t) =>
            mt(t.tarea + ` ` + t.codigo + ` ` + t.persona).includes(e),
          )
          .slice(0, 5),
        r = M.documentos
          .filter((t) => mt(t.codigo + ` ` + t.titulo).includes(e))
          .slice(0, 5),
        i = M.bitacora.filter((t) => mt(t.nota).includes(e)).slice(0, 5);
      return (
        <div className={`sg-busq`}>
          {t.map((e) => (
            <button onClick={() => Ae(e.proyecto, e.codigo)} key={e.codigo}>
              <span className={`tag`}>{`Actividad`}</span>
              {e.codigo}
              {` `}
              {e.actividad}
            </button>
          ))}
          {n.map((e, t) => (
            <button
              onClick={() => {
                ie(oe), Ae(`Pendientes`);
              }}
              key={`p` + t}
            >
              <span className={`tag`}>{`Pendiente`}</span>
              {e.tarea}
            </button>
          ))}
          {r.map((e) => (
            <button
              onClick={() => {
                D(oe), Ae(`Documentos`);
              }}
              key={e.codigo}
            >
              <span className={`tag`}>{`Documento`}</span>
              {e.titulo}
            </button>
          ))}
          {i.map((e, t) => (
            <button
              onClick={() => {
                te(oe), Ae(`Bitácora`);
              }}
              key={`b` + t}
            >
              <span className={`tag`}>{`Bitácora`}</span>
              {e.nota.slice(0, 80)}
            </button>
          ))}
          {!t.length && !n.length && !r.length && !i.length && (
            <p className={`muted`}>{`Sin resultados.`}</p>
          )}
        </div>
      );
    },
    Ze = j.filter((e) => e.estado === `por_confirmar`).length,
    Qe = o.startsWith(`Diario:`) ? `Diarios` : o,
    $e = L
      ? `${L.proyecto} · ${F(L)}`
      : o === `General`
        ? (xe.titulo ?? `Tablero de avance`)
        : o.startsWith(`Diario:`)
          ? `Diario de campo · ` + o.slice(7)
          : o === `Diarios`
            ? `Diarios de campo`
            : o === `Pendientes`
              ? `Pendientes por persona`
              : o === `Calendario`
                ? `Calendario de actividades`
                : o === `Indicadores`
                  ? `Indicadores de avance`
                  : o,
    et = `Guardado en este equipo${e.obtenido ? ` · última carga ` + new Date(e.obtenido).toLocaleString(`es-MX`) : ``}`;
  return (
    <div className={`sg`}>
      <div className={`sg-tabs`} role={`tablist`}>
        {[
          `General`,
          ...(P.proyectos.length > 1
            ? P.proyectos.map((e) => e.proyecto).filter((e) => e !== `General`)
            : []),
        ].map((e) => {
          let t =
            e === `General`
              ? void 0
              : P.proyectos.find((t) => t.proyecto === e);
          return (
            <button
              className={Qe === e ? `on` : ``}
              onClick={() => Ae(e)}
              key={e}
            >
              {t ? `${e} · ${F(t)}` : `Avance general`}
              {t && t.vencidas > 0 && (
                <span className={`ct`}>{t.vencidas}</span>
              )}
            </button>
          );
        })}
        <span className={`grp`}>{`Consulta`}</span>
        {gt.map((e) => (
          <button
            className={Qe === e ? `on` : ``}
            onClick={() => Ae(e)}
            key={e}
          >
            {e === `Diarios` ? `Diarios de campo` : e}
            {e === `Pendientes` && Oe > 0 && <span className={`ct`}>{Oe}</span>}
            {e === `Actualizaciones` && Ze > 0 && (
              <span className={`ct`}>{Ze}</span>
            )}
          </button>
        ))}
      </div>
      <header className={`sg-cab`}>
        <div>
          <small className={`muted`}>
            {`Corte al `}
            {dt(P.corte)}
            {P.meta?.hoja ? ` · ` + P.meta.hoja : ``}
          </small>
          <h2>{$e}</h2>
        </div>
        <span className={`sg-vivo`}>{et}</span>
        <button onClick={() => u((e) => e + 1)} disabled={d}>
          {d ? `Cargando…` : `Recargar`}
        </button>
        <div className={`sg-buscar`}>
          <input
            placeholder={`Buscar en todo el tablero`}
            value={oe}
            onChange={(e) => se(e.target.value)}
          />
          {Xe()}
        </div>
      </header>
      {e.error && (
        <div className={`aviso`}>
          {e.origen === `cache`
            ? `No se pudo leer la fuente: ` +
              e.error +
              `. Se muestran los últimos datos guardados.`
            : e.error}
        </div>
      )}
      {P.avisos.length > 0 && (
        <div className={`aviso`}>
          {`Avisos: `}
          {P.avisos.join(` · `)}
        </div>
      )}
      {o === `General` && (
        <>
          {je(P.total, `Avance real · ${P.proyectos.length} proyectos`)}
          <div className={`sg-tarjs`}>{P.proyectos.map(Me)}</div>
          <div className={`sg-g2`}>
            {Re()}
            {ze()}
          </div>
          {Le()}
          <h3>{`Avance por actividad`}</h3>
          {Be}
          {Ie()}
          {P.proyectos.map(Fe)}
        </>
      )}
      {L && (
        <>
          {je(L, `Avance real · ` + L.sigla)}
          {Le()}
          <h3>{`Avance por actividad`}</h3>
          {Be}
          {Ie()}
          {Fe(L)}
          <h3>{`Secuencias (pasos hechos / pasos totales)`}</h3>
          <div className={`sg-secus`}>
            {Object.values(M.secuencias)
              .filter(
                (e) =>
                  P.actividades.find((t) => t.codigo === e.codigo)?.proyecto ===
                    L.proyecto || e.codigo.startsWith((L.sigla ?? ``) + `-`),
              )
              .map((e) => (
                <div key={e.codigo}>{Pe(e.codigo)}</div>
              ))}
          </div>
          <h3>{`Por unidad`}</h3>
          <table className={`sg-tabla`}>
            <thead>
              <tr>
                <th>{`Unidad`}</th>
                <th>{`Actividades`}</th>
                <th>{`Real`}</th>
                <th>{`Programado`}</th>
                <th>{`Vencidas`}</th>
                <th>{`Semáforo`}</th>
              </tr>
            </thead>
            <tbody>
              {P.unidades
                .filter((e) => e.proyecto === L.proyecto)
                .map((e) => (
                  <tr key={e.cod_unidad}>
                    <td>
                      {e.cod_unidad}
                      {` `}
                      <small>{e.unidad}</small>
                    </td>
                    <td>{e.actividades}</td>
                    <td>{A(e.pct_real)}</td>
                    <td>{A(e.pct_programado)}</td>
                    <td>{e.vencidas}</td>
                    <td>
                      <i
                        className={`dot`}
                        style={{
                          background: vt(e.semaforo),
                        }}
                      />
                      {e.semaforo}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {o === `Actualizaciones` && createElement(ge, null)}
      {o === `Calendario` && Ve()}
      {o === `Indicadores` && He()}
      {o === `Pendientes` && Ue()}
      {o === `Documentos` && Ge()}
      {o === `Bitácora` && Ke()}
      {(o === `Diarios` || o.startsWith(`Diario:`)) && qe()}
      {o === `Gestionar` &&
        createElement(ct, {
          onCambio: be,
        })}
      {o === `Importar` &&
        createElement(at, {
          sugerida: e.fuente_sugerida,
          onCambio: be,
        })}
      <p className={`sg-pie muted`}>
        {P.meta?.hoja ? `Datos de «${P.meta.hoja}». ` : ``}
        {P.estados.length > 0 &&
          `Cómo cuenta cada estado: ${P.estados.map((e) => `${e[0]} ${Math.round(e[1] * 100)} %`).join(`, `)}. `}
        {`Un paso vacío cuenta 0 %; «No aplica» y «Fuera de alcance» no cuentan. Los pasos con la etiqueta «Lectura» se calculan con las encuestas leídas en esta app. Todo lo que cambies aquí se guarda solo en este equipo.`}
      </p>
      {ce && We()}
      {de && Je(de)}
      {pe && Ye(pe)}
      {ve && <div className={`sg-toast`}>{ve}</div>}
    </div>
  );
}
function xt(e) {
  let t = ``;
  try {
    t = String(JSON.parse(e.plantilla_json || `{}`).nombre ?? ``);
  } catch {}
  return (
    (t =
      t ||
      String(e.notas ?? ``)
        .split(
          `
`,
        )[0]
        .slice(0, 60) ||
      e.codigo),
    e.version && e.version !== `1` ? `${t} (versión ${e.version})` : t
  );
}
function St() {
  let [e, t] = useState([]),
    [n, r] = useState(null),
    [i, a] = useState(!1),
    [o, s] = useState({}),
    [c, u] = useState([]);
  useEffect(() => {
    window.ocr
      .call(`proyectos`, {})
      .then((e) => {
        t(e.proyectos), r(e.activo);
      })
      .catch(() => {});
  }, []);
  async function d(e) {
    await window.ocr.call(`proyecto_activar`, {
      id: e,
    }),
      r(e),
      window.dispatchEvent(new Event(`proyecto`));
  }
  async function f() {
    let e = await window.ocr.call(`proyecto_config`, {});
    s(e.config || {}),
      u(
        await window.ocr.call(`list`, {
          table: `instrumentos`,
          activo: !0,
        }),
      ),
      a(!0);
  }
  async function m() {
    await window.ocr.call(`proyecto_guardar_config`, {
      config: {
        seguimiento: o.seguimiento ?? {},
        instrumento_id: o.instrumento_id ?? null,
      },
    }),
      a(!1),
      window.dispatchEvent(new Event(`proyecto`));
  }
  return (
    <span className={`proy`}>
      <label>
        <small>{tr(`Proyecto`)}</small>
        <select
          value={n ?? ``}
          onChange={(e) => void d(Number(e.target.value))}
        >
          {e.map((e) => (
            <option value={e.id} key={e.id}>
              {e.codigo}
              {` · `}
              {e.nombre}
            </option>
          ))}
        </select>
      </label>
      <button
        className={`btn`}
        aria-label={`Ajustes del proyecto`}
        title={`Ajustes del proyecto`}
        onClick={() => void f()}
      >{`⚙`}</button>
      {i &&
        createPortal(
          <div className={`modal-fondo`} onClick={() => a(!1)}>
            <div
              className={`modal card`}
              role={`dialog`}
              aria-label={`Ajustes del proyecto`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{`Ajustes del proyecto`}</h3>
              <label>
                {`Formato de encuesta`}
                <select
                  value={o.instrumento_id ?? ``}
                  onChange={(e) =>
                    s({
                      ...o,
                      instrumento_id: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                >
                  <option value={``}>{`El primero del proyecto`}</option>
                  {c.map((e) => (
                    <option value={e.id} key={e.id}>
                      {xt(e)}
                    </option>
                  ))}
                </select>
              </label>
              <p
                className={`muted`}
              >{`Es el cuestionario impreso que la app sabe leer. Si no aparece el tuyo, agrégalo en «1 · Subir lote» → «Agregar formato de encuesta».`}</p>
              <p
                className={`muted`}
              >{`El avance del proyecto se carga con el botón «Cargar Excel» en Seguimiento → Importar. La IA del proyecto se ajusta en Asistente → «IA del proyecto».`}</p>
              <p
                className={`muted`}
              >{`Las direcciones técnicas están en Personalización → Avanzado (solo administración).`}</p>
              <div className={`actions`}>
                <button
                  className={`btn primary`}
                  onClick={() => void m()}
                >{`Guardar`}</button>
                <button
                  className={`btn`}
                  onClick={() => a(!1)}
                >{`Cancelar`}</button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </span>
  );
}
function Ct({ listo: e }) {
  let [t, n] = useState({
      nombre: ``,
      email: ``,
      codigo: ``,
      pnombre: ``,
    }),
    [r, i] = useState(``),
    a = (e) => (r) =>
      n({
        ...t,
        [e]: r.target.value,
      });
  return (
    <div className={`modal-fondo`}>
      <form
        className={`modal card`}
        onSubmit={async (n) => {
          n.preventDefault();
          try {
            await window.ocr.call(`primer_arranque`, {
              admin: {
                nombre: t.nombre,
                email: t.email,
              },
              proyecto: {
                codigo: t.codigo,
                nombre: t.pnombre,
              },
            }),
              e();
          } catch (e) {
            i(String(e).replace(/^Error: /, ``));
          }
        }}
      >
        <h3>{`Bienvenido · configuración inicial`}</h3>
        <p
          className={`muted`}
        >{`Esta instalación está vacía. Crea la cuenta de administración y el primer proyecto. Todo se guarda solo en este equipo.`}</p>
        <label>
          {`Nombre del administrador`}
          <input required={!0} value={t.nombre} onChange={a(`nombre`)} />
        </label>
        <label>
          {`Correo del administrador`}
          <input
            required={!0}
            type={`email`}
            value={t.email}
            onChange={a(`email`)}
          />
        </label>
        <label>
          {`Código del proyecto (corto, p. ej. «PRY1»)`}
          <input
            required={!0}
            maxLength={20}
            value={t.codigo}
            onChange={a(`codigo`)}
          />
        </label>
        <label>
          {`Nombre del proyecto`}
          <input required={!0} value={t.pnombre} onChange={a(`pnombre`)} />
        </label>
        {r && <small className={`error`}>{r}</small>}
        <p
          className={`muted`}
        >{`Después podrás agregar tu formato de encuesta en «Importar lote» y cargar el avance con «Cargar Excel» en Seguimiento. La IA viene apagada; se activa en Asistente.`}</p>
        <div className={`actions`}>
          <button className={`primary`}>{`Empezar`}</button>
        </div>
      </form>
    </div>
  );
}
var wt = [
    [`tipo`, `Tipo`],
    [`proyecto`, `Proyecto`],
    [`unidad`, `Unidad`],
    [`instrumento`, `Instrumento`],
    [`actividad`, `Actividad`],
  ],
  Tt = {
    proyecto: `Proyecto`,
    unidad: `Unidad / localidad`,
    instrumento: `Instrumento`,
    actividad: `Actividad`,
    tipo: `Tipo de documento`,
  },
  Et = {
    propuesto: `Propuesta lista`,
    por_confirmar: `Por confirmar`,
    confirmado: `Confirmado`,
  },
  Dt = (e) => `${Math.round((e ?? 0) * 100)} %`,
  Ot = (e) => String(e).replace(/^Error:\s*/, ``);
function PantallaBandeja({ onChange: e }) {
  let [t, n] = useState(`bandeja`),
    [r, i] = useState(``),
    [a, o] = useState([]),
    [s, c] = useState([]),
    [u, d] = useState(``),
    [f, m] = useState(null),
    [h, g] = useState(!1),
    [_, v] = useState(null),
    [y, b] = useState({}),
    [x, S] = useState({
      categoria: `tipo`,
      codigo: ``,
      nombre: ``,
      claves: ``,
    }),
    [C, w] = useState(null),
    T = useCallback(async () => {
      try {
        o(
          await window.ocr.call(
            `bandeja_listar`,
            r
              ? {
                  estado: r,
                }
              : {},
          ),
        ),
          c(await window.ocr.call(`libro_listar`, {}));
      } catch (e) {
        m(Ot(e));
      }
    }, [r]);
  useEffect(() => {
    T();
  }, [T]);
  let E = async (t) => {
      g(!0), m(null);
      try {
        await t();
      } catch (e) {
        m(Ot(e));
      } finally {
        g(!1), await T(), e?.();
      }
    },
    D = () =>
      E(async () => {
        let e = await window.ocr.openArchivos();
        e.length &&
          (d(`Leyendo ${e.length} archivo(s)…`),
          d(j(await ye(e)).replace(/\nPuedes preguntarme[\s\S]*/, ``)));
      }),
    O = (e, t) =>
      E(async () => {
        await window.ocr.call(`bandeja_confirmar`, {
          id: e.id,
          clasificacion: t ?? null,
        }),
          v(null),
          d(`«${e.nombre}» quedó clasificado.`);
      }),
    k = (e) =>
      E(async () => {
        await window.ocr.call(`bandeja_archivar`, {
          id: e.id,
        }),
          d(`«${e.nombre}» se archivó (no se borró).`);
      }),
    ee = async (e) => {
      if (C?.id === e.id) return w(null);
      let t = await window.ocr.call(`bandeja_leer`, {
        id: e.id,
      });
      w({
        id: e.id,
        texto:
          (t.texto || `(sin texto legible)`) +
          (t.partes > 1
            ? `
…`
            : ``),
      });
    },
    te = () =>
      E(async () => {
        let [e] = await window.ocr.openArchivos(!0);
        if (!e) return;
        let t = await window.ocr.call(`libro_importar`, {
          ruta: e,
        });
        d(
          `Libro de códigos: ${t.importados} código(s) importados${t.omitidos ? `, ${t.omitidos} fila(s) omitidas` : ``}${t.no_verificados ? `, ${t.no_verificados} sin verificar (no se agregaron)` : ``}. Se volvieron a proponer ${t.reclasificados} documento(s) sin confirmar.`,
        );
      }),
    ne = () =>
      E(async () => {
        if (!x.codigo.trim()) throw Error(`Escribe el código.`);
        await window.ocr.call(`libro_guardar`, x),
          S({
            ...x,
            codigo: ``,
            nombre: ``,
            claves: ``,
          }),
          d(`Código guardado.`);
      }),
    A = (e) => s.filter((t) => t.categoria === e),
    re = a.filter((e) => e.estado === `por_confirmar`).length;
  return (
    <section className={`stage pad wb bandeja`}>
      <div>
        <div>
          <h1>{`Bandeja de entrada`}</h1>
          <p
            className={`muted`}
          >{`Todo lo que subes (PDF, fotos, Excel, Word, texto) queda aquí. La app lee su texto en este equipo y propone cómo clasificarlo; tú confirmas.`}</p>
        </div>
      </div>
      <div className={`bandeja-tabs`}>
        <button
          className={t === `bandeja` ? `btn primary` : `btn`}
          onClick={() => n(`bandeja`)}
        >
          {`Documentos`}
          {re ? ` · ${re} por confirmar` : ``}
        </button>
        <button
          className={t === `libro` ? `btn primary` : `btn`}
          onClick={() => n(`libro`)}
        >
          {`Libro de códigos (`}
          {s.length}
          {`)`}
        </button>
      </div>
      {f && <div className={`err wb-msg`}>{f}</div>}
      {u && !f && (
        <div
          className={`wb-msg ok-msg`}
          style={{
            whiteSpace: `pre-line`,
          }}
        >
          {u}
        </div>
      )}
      {t === `bandeja` && (
        <>
          <div
            className={`row`}
            style={{
              gap: 8,
              margin: `12px 0`,
            }}
          >
            <button
              className={`btn primary`}
              disabled={h}
              onClick={() => void D()}
            >{`Subir archivos…`}</button>
            <select
              value={r}
              onChange={(e) => i(e.target.value)}
              aria-label={`Filtrar`}
            >
              <option value={``}>{`Todos`}</option>
              <option value={`por_confirmar`}>{`Por confirmar`}</option>
              <option value={`propuesto`}>{`Propuesta lista`}</option>
              <option value={`confirmado`}>{`Confirmados`}</option>
            </select>
            {!s.length && (
              <small
                className={`muted`}
              >{`Sin libro de códigos la app no puede proponer códigos: agrégalo en la pestaña «Libro de códigos».`}</small>
            )}
          </div>
          {a.length ? (
            <table className={`sg-tabla`}>
              <thead>
                <tr>
                  <th>{`Archivo`}</th>
                  <th>{`Texto`}</th>
                  <th>{`Clasificación`}</th>
                  <th>{`Confianza`}</th>
                  <th>{`Estado`}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {a.map((e) => {
                  let t = e.clasificacion ?? e.propuesta ?? {},
                    n = wt
                      .filter(([e]) => t[e])
                      .map(([e, n]) => `${n}: ${t[e]}`);
                  return (
                    <tr className={`fila-bandeja`} key={e.id}>
                      <td>
                        <b>{e.nombre}</b>
                        {t.nombre_sugerido && (
                          <div>
                            <small className={`muted`}>
                              {`Nombre sugerido: `}
                              {t.nombre_sugerido}
                            </small>
                          </div>
                        )}
                        {C?.id === e.id && (
                          <pre className={`bandeja-texto`}>{C.texto}</pre>
                        )}
                      </td>
                      <td>
                        {e.caracteres
                          ? `${e.caracteres} caracteres`
                          : `sin texto`}
                        {e.aviso_texto && (
                          <div>
                            <small className={`muted`}>{e.aviso_texto}</small>
                          </div>
                        )}
                      </td>
                      <td>
                        {_ === e.id ? (
                          <div className={`bandeja-form`}>
                            {wt.map(([e, t]) => (
                              <label key={e}>
                                {t}
                                {` `}
                                <select
                                  value={String(y[e] ?? ``)}
                                  onChange={(t) =>
                                    b({
                                      ...y,
                                      [e]: t.target.value || null,
                                    })
                                  }
                                >
                                  <option value={``}>{`—`}</option>
                                  {A(e).map((e) => (
                                    <option value={e.codigo} key={e.codigo}>
                                      {e.codigo}
                                      {e.nombre ? ` · ${e.nombre}` : ``}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            ))}
                          </div>
                        ) : n.length ? (
                          n.join(` · `)
                        ) : (
                          <span className={`muted`}>{`Sin propuesta`}</span>
                        )}
                        {e.estado !== `confirmado` &&
                        e.propuesta?.motivos?.length ? (
                          <div>
                            <small className={`muted`}>
                              {e.propuesta.motivos.slice(0, 3).join(`; `)}
                            </small>
                          </div>
                        ) : null}
                      </td>
                      <td>
                        {e.estado === `confirmado` ? `—` : Dt(e.confianza)}
                      </td>
                      <td>{Et[e.estado] ?? e.estado}</td>
                      <td
                        style={{
                          whiteSpace: `nowrap`,
                        }}
                      >
                        {_ === e.id ? (
                          <>
                            <button
                              className={`btn primary`}
                              disabled={h}
                              onClick={() => void O(e, y)}
                            >{`Aplicar`}</button>
                            {` `}
                            <button
                              className={`btn`}
                              onClick={() => v(null)}
                            >{`Cancelar`}</button>
                          </>
                        ) : (
                          <>
                            {e.estado !== `confirmado` && n.length > 0 && (
                              <button
                                className={`btn primary`}
                                disabled={h}
                                onClick={() => void O(e)}
                              >{`Aplicar`}</button>
                            )}
                            {` `}
                            <button
                              className={`btn`}
                              disabled={!s.length}
                              title={
                                s.length
                                  ? ``
                                  : `Primero agrega el libro de códigos`
                              }
                              onClick={() => {
                                b({
                                  ...t,
                                }),
                                  v(e.id);
                              }}
                            >{`Corregir`}</button>
                            {` `}
                            <button
                              className={`btn`}
                              onClick={() => void ee(e)}
                            >
                              {C?.id === e.id ? `Ocultar texto` : `Ver texto`}
                            </button>
                            {` `}
                            <button
                              className={`btn ghost`}
                              disabled={h}
                              onClick={() => void k(e)}
                            >{`Archivar`}</button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p
              className={`muted`}
            >{`Todavía no hay documentos. Pulsa «Subir archivos…».`}</p>
          )}
        </>
      )}
      {t === `libro` && (
        <>
          <p
            className={`muted`}
            style={{
              marginTop: 12,
            }}
          >{`El libro de códigos es la referencia única del proyecto: unidades o localidades, instrumentos, actividades y tipos de documento (por ejemplo oficios, diarios, guías). Puedes importarlo de un Excel, CSV, Word (columnas «Categoría», «Código», «Nombre» y «Palabras clave») o JSON; lo marcado como no verificado no se agrega.`}</p>
          <div
            className={`row`}
            style={{
              gap: 8,
              margin: `12px 0`,
            }}
          >
            <button
              className={`btn primary`}
              disabled={h}
              onClick={() => void te()}
            >{`Importar libro de códigos…`}</button>
          </div>
          <div className={`bandeja-form`}>
            <b>{`Agregar código`}</b>
            <label>
              {`Categoría`}
              <select
                value={x.categoria}
                onChange={(e) =>
                  S({
                    ...x,
                    categoria: e.target.value,
                  })
                }
              >
                {Object.entries(Tt).map(([e, t]) => (
                  <option value={e} key={e}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {`Código`}
              <input
                value={x.codigo}
                onChange={(e) =>
                  S({
                    ...x,
                    codigo: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Nombre`}
              <input
                value={x.nombre ?? ``}
                onChange={(e) =>
                  S({
                    ...x,
                    nombre: e.target.value,
                  })
                }
              />
            </label>
            <label>
              {`Palabras clave (separadas por coma)`}
              <input
                value={x.claves ?? ``}
                onChange={(e) =>
                  S({
                    ...x,
                    claves: e.target.value,
                  })
                }
              />
            </label>
            <button
              className={`btn primary`}
              disabled={h}
              onClick={() => void ne()}
            >{`Guardar código`}</button>
          </div>
          {s.length > 0 && (
            <table className={`sg-tabla`}>
              <thead>
                <tr>
                  <th>{`Categoría`}</th>
                  <th>{`Código`}</th>
                  <th>{`Nombre`}</th>
                  <th>{`Palabras clave`}</th>
                </tr>
              </thead>
              <tbody>
                {s.map((e) => (
                  <tr key={e.categoria + e.codigo}>
                    <td>{Tt[e.categoria] ?? e.categoria}</td>
                    <td>{e.codigo}</td>
                    <td>{e.nombre}</td>
                    <td>{e.claves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
}
var At = [`drive`, `sheets`, `docs`, `gmail`, `calendar`],
  jt = {
    drive: `Archivos de Drive`,
    sheets: `Hojas de cálculo`,
    docs: `Documentos`,
    gmail: `Correo (solo borradores)`,
    calendar: `Calendario`,
  },
  Mt = [
    {
      id: `adjuntos14`,
      etiqueta: `Correos con adjuntos de los últimos 14 días`,
      q: `has:attachment newer_than:14d`,
    },
    {
      id: `adjuntos30`,
      etiqueta: `Correos con adjuntos de los últimos 30 días`,
      q: `has:attachment newer_than:30d`,
    },
    {
      id: `pdf30`,
      etiqueta: `Correos con PDF de los últimos 30 días`,
      q: `filename:pdf newer_than:30d`,
    },
    {
      id: `noleidos7`,
      etiqueta: `Correos sin leer de la última semana`,
      q: `is:unread newer_than:7d`,
    },
  ],
  catalogoConectores = [
    {
      tipo: `google`,
      nombre: `Google`,
      boton: `Conectar con Google`,
      descripcion: `Trae archivos, hojas, documentos, correos y eventos de tu cuenta de Google. El correo solo se lee y se preparan borradores: nunca se envía nada.`,
      auth: `oauth`,
      oauth: `google`,
      campos: [
        {
          id: `servicios`,
          etiqueta: `¿Qué quieres usar?`,
          tipo: `servicios`,
          opciones: At,
        },
        {
          id: `carpeta_drive`,
          etiqueta: `Carpeta de Drive`,
          tipo: `elegir`,
          elegir: `carpeta_drive`,
          servicio: `drive`,
        },
        {
          id: `hoja_id`,
          etiqueta: `Hoja de cálculo`,
          tipo: `elegir`,
          elegir: `hoja`,
          servicio: `sheets`,
        },
        {
          id: `docs`,
          etiqueta: `Documentos`,
          tipo: `elegir`,
          elegir: `doc`,
          multiple: !0,
          servicio: `docs`,
        },
        {
          id: `gmail_q`,
          etiqueta: `¿Qué correos revisar?`,
          tipo: `opciones`,
          opciones: Mt.map((e) => e.id),
          servicio: `gmail`,
        },
        {
          id: `calendario`,
          etiqueta: `Calendario`,
          tipo: `elegir`,
          elegir: `calendario`,
          servicio: `calendar`,
        },
        {
          id: `exportar`,
          etiqueta: `Guardar resultados en Drive (solo archivos creados por esta app)`,
          tipo: `bool`,
          servicio: `drive`,
        },
      ],
      capacidades: [`importar`, `exportar`, `borradores`],
    },
    {
      tipo: `microsoft`,
      nombre: `Microsoft (OneDrive / SharePoint)`,
      boton: `Conectar con Microsoft`,
      descripcion: `Trae los PDF de una carpeta de tu OneDrive.`,
      auth: `oauth`,
      oauth: `microsoft`,
      campos: [
        {
          id: `carpeta`,
          etiqueta: `Carpeta`,
          tipo: `elegir`,
          elegir: `carpeta`,
        },
        {
          id: `exportar`,
          etiqueta: `Guardar resultados en Microsoft`,
          tipo: `bool`,
        },
        {
          id: `carpeta_export`,
          etiqueta: `Carpeta para guardar resultados`,
          tipo: `elegir`,
          elegir: `carpeta`,
        },
        {
          id: `sitio_id`,
          etiqueta: `Sitio de SharePoint (lo indica soporte)`,
          tipo: `texto`,
          avanzado: !0,
        },
      ],
      capacidades: [`importar`, `exportar`],
    },
    {
      tipo: `dropbox`,
      nombre: `Dropbox`,
      boton: `Conectar con Dropbox`,
      descripcion: `Trae los PDF de una carpeta de tu Dropbox.`,
      auth: `oauth`,
      oauth: `dropbox`,
      campos: [
        {
          id: `carpeta`,
          etiqueta: `Carpeta`,
          tipo: `elegir`,
          elegir: `carpeta`,
        },
        {
          id: `exportar`,
          etiqueta: `Guardar resultados en Dropbox`,
          tipo: `bool`,
        },
        {
          id: `carpeta_export`,
          etiqueta: `Carpeta para guardar resultados`,
          tipo: `elegir`,
          elegir: `carpeta`,
        },
      ],
      capacidades: [`importar`, `exportar`],
    },
    {
      tipo: `carpeta`,
      nombre: `Carpeta de este equipo`,
      boton: `Usar una carpeta de este equipo`,
      descripcion: `Los PDF nuevos que pongas en esta carpeta pasan solos al asistente para revisarlos.`,
      auth: `ninguna`,
      campos: [
        {
          id: `ruta`,
          etiqueta: `Carpeta`,
          tipo: `ruta`,
          requerido: !0,
        },
        {
          id: `auto`,
          etiqueta: `Enviar solos los PDF nuevos al asistente`,
          tipo: `bool`,
        },
      ],
      capacidades: [`importar`, `vigilar`],
    },
    {
      tipo: `webhook`,
      nombre: `Webhook / REST`,
      boton: `Webhook / REST`,
      descripcion: `Entrada: servidor local (127.0.0.1) con clave. Salida: POST a una dirección https. Lectura opcional (GET).`,
      auth: `ninguna`,
      avanzado: !0,
      campos: [
        {
          id: `puerto`,
          etiqueta: `Puerto de entrada local (vacío = sin entrada)`,
          tipo: `numero`,
        },
        {
          id: `salida_url`,
          etiqueta: `Dirección de salida (https)`,
          tipo: `url`,
        },
        {
          id: `salida_secreto`,
          etiqueta: `Clave de salida`,
          tipo: `secreto`,
        },
        {
          id: `rest_url`,
          etiqueta: `Dirección para leer (GET, https)`,
          tipo: `url`,
        },
      ],
      capacidades: [`importar`, `exportar`, `entrada`],
    },
    {
      tipo: `mcp`,
      nombre: `Servidor MCP`,
      boton: `Servidor MCP`,
      descripcion: `Lee recursos de un servidor MCP de confianza (comando local o dirección).`,
      auth: `ninguna`,
      avanzado: !0,
      campos: [
        {
          id: `comando`,
          etiqueta: `Comando`,
          tipo: `texto`,
          ayuda: `p. ej. npx mi-servidor-mcp`,
        },
        {
          id: `url`,
          etiqueta: `Dirección (alternativa al comando)`,
          tipo: `url`,
        },
        {
          id: `token`,
          etiqueta: `Clave (opcional)`,
          tipo: `secreto`,
        },
      ],
      capacidades: [`importar`],
    },
  ];
function Pt(e) {
  let t = catalogoConectores.find((t) => t.tipo === e);
  if (!t) throw Error(`Conector desconocido: ${e}`);
  return t;
}
var Ft = `https://www.googleapis.com/auth/`;
function alcancesConector(e, t) {
  let n = !!t.exportar;
  if (e === `google`) {
    let e = new Set(
        (Array.isArray(t.servicios) ? t.servicios : []).filter((e) =>
          At.includes(e),
        ),
      ),
      r = [`openid`, `email`];
    return (
      e.has(`drive`) && r.push(Ft + `drive.readonly`),
      e.has(`drive`) && n && r.push(Ft + `drive.file`),
      e.has(`sheets`) && r.push(Ft + `spreadsheets.readonly`),
      e.has(`docs`) && r.push(Ft + `documents.readonly`),
      e.has(`gmail`) && r.push(Ft + `gmail.readonly`, Ft + `gmail.compose`),
      e.has(`calendar`) && r.push(Ft + `calendar.readonly`),
      r
    );
  }
  if (e === `microsoft`) {
    let e = [
      `offline_access`,
      `User.Read`,
      n ? `Files.ReadWrite` : `Files.Read`,
    ];
    return t.sitio_id && e.push(`Sites.Read.All`), e;
  }
  if (e === `dropbox`) {
    let e = [`account_info.read`, `files.metadata.read`, `files.content.read`];
    return n && e.push(`files.content.write`), e;
  }
  return [];
}
function validarConector(e, t) {
  let n = Pt(e),
    r = [];
  for (let e of n.campos) {
    let n = t[e.id];
    if (
      (e.requerido &&
        (n == null || n === ``) &&
        r.push(`Falta «${e.etiqueta}»`),
      e.tipo === `url` &&
        n &&
        !Rt(String(n)) &&
        r.push(`«${e.etiqueta}» debe ser https`),
      e.tipo === `numero` && n !== void 0 && n !== `` && n !== null)
    ) {
      let t = Number(n);
      (!Number.isInteger(t) || t < 1024 || t > 65535) &&
        r.push(`«${e.etiqueta}» fuera de rango (1024-65535)`);
    }
  }
  return (
    e === `google` &&
      !(Array.isArray(t.servicios) && t.servicios.length) &&
      r.push(`Marca al menos una opción de Google`),
    e === `mcp` &&
      !t.comando &&
      !t.url &&
      r.push(`Indica un comando o una dirección`),
    r
  );
}
function Rt(e) {
  try {
    let t = new URL(e);
    return (
      t.protocol === `https:` ||
      (t.protocol === `http:` &&
        [`127.0.0.1`, `localhost`, `[::1]`].includes(t.hostname))
    );
  } catch {
    return !1;
  }
}
var zt = (e) =>
    String(e).replace(
      /^Error: (Error invoking remote method '[^']+': )?(Error: )?/,
      ``,
    ),
  Bt = `Aún no configurado: falta registrar la app de inicio de sesión de este servicio. Pide a soporte que la active.`,
  Vt = (e) => e === `carpeta` || e === `carpeta_drive`,
  Ht = (e) =>
    (Array.isArray(e) ? e : e ? [e] : [])
      .map((e) =>
        typeof e == `string`
          ? {
              ref: e,
              nombre: e,
            }
          : e,
      )
      .filter((e) => e && e.ref !== void 0),
  Ut = {
    google: `🟢`,
    microsoft: `🟦`,
    dropbox: `🔷`,
    carpeta: `📁`,
  };
function PantallaConectores() {
  let [e, t] = useState([]),
    [n, r] = useState([]),
    [i, a] = useState({}),
    [o, s] = useState({}),
    [c, u] = useState(null),
    [d, f] = useState(``),
    [m, h] = useState(null),
    [g, _] = useState(null),
    v = useCallback(async () => {
      let e = await window.ocr.conectores.lista();
      r(e),
        a(
          Object.fromEntries(
            e.map((e) => [
              e.id,
              {
                ...e.cfg,
              },
            ]),
          ),
        );
    }, []);
  useEffect(() => {
    (async () => {
      t(await window.ocr.conectores.catalogo()), await v();
    })();
    let e = () => void v();
    return (
      window.addEventListener(`proyecto`, e),
      () => window.removeEventListener(`proyecto`, e)
    );
  }, [v]);
  let y = (e, t, n) =>
      s((r) => ({
        ...r,
        [e]: {
          ok: t,
          txt: n,
        },
      })),
    b = (t) => e.find((e) => e.tipo === t);
  async function x(e) {
    y(e, !0, `Se abrió tu navegador: inicia sesión y acepta los permisos…`);
    try {
      let t = await window.ocr.conectores.conectar(e);
      y(
        e,
        !0,
        t?.secreto
          ? `Listo. Dirección: ${t.url} · Clave (se muestra una sola vez): ${t.secreto}`
          : t?.demo
            ? `Conectado (en la demo el inicio de sesión se simula).`
            : `¡Conectado!`,
      );
    } catch (t) {
      y(e, !1, zt(t));
    }
    await v();
  }
  async function S(e) {
    f(``);
    try {
      if (e.tipo === `carpeta`) {
        let t = await window.ocr.conectores.carpetaLocal();
        if (!t) return;
        await window.ocr.conectores.guardar({
          tipo: `carpeta`,
          nombre: e.nombre,
          cfg: {
            ruta: t,
            auto: !0,
          },
        }),
          await v();
        return;
      }
      let t = await window.ocr.conectores.guardar({
        tipo: e.tipo,
        nombre: e.nombre,
        cfg:
          e.tipo === `google`
            ? {
                servicios: [`drive`],
                gmail_q: `adjuntos14`,
              }
            : {},
      });
      await v(), await x(t.id);
    } catch (e) {
      f(zt(e));
    }
  }
  async function C(e) {
    let t = b(e.tipo);
    try {
      let n = await window.ocr.conectores.guardar({
        id: e.id,
        tipo: e.tipo,
        nombre: e.nombre,
        cfg: i[e.id] ?? e.cfg,
      });
      await v(),
        t?.auth === `oauth` && e.conectado && !n.conectado
          ? await x(e.id)
          : y(e.id, !0, `Cambios guardados.`);
    } catch (t) {
      y(e.id, !1, zt(t));
    }
  }
  async function w(e, t, n) {
    let r = n ?? [],
      a = r[r.length - 1];
    h((n) => ({
      con: e,
      campo: t,
      ruta: r,
      items: null,
      elegidos:
        n?.campo.id === t.id ? n.elegidos : Ht((i[e.id] ?? e.cfg)[t.id]),
    }));
    try {
      let n = await window.ocr.conectores.elegir(e.id, t.elegir ?? ``, a?.ref);
      h(
        (e) =>
          e && {
            ...e,
            items: n,
          },
      );
    } catch (e) {
      h(
        (t) =>
          t && {
            ...t,
            items: [],
            error: zt(e),
          },
      );
    }
  }
  function T(e) {
    if (!m) return;
    let { con: t, campo: n } = m;
    a((r) => ({
      ...r,
      [t.id]: {
        ...(r[t.id] ?? t.cfg),
        [n.id]: e,
      },
    })),
      h(null);
  }
  function E(e, t) {
    let n = i[e.id] ?? e.cfg,
      r = n[t.id],
      o = (r) =>
        a((i) => ({
          ...i,
          [e.id]: {
            ...n,
            [t.id]: r,
          },
        })),
      s = Array.isArray(n.servicios) ? n.servicios : [];
    if (t.servicio && !s.includes(t.servicio) && e.tipo === `google`)
      return null;
    if (t.tipo === `servicios`)
      return (
        <fieldset className={`con-servicios`} key={t.id}>
          <legend>{t.etiqueta}</legend>
          {t.opciones?.map((e) => (
            <label className={`check`} key={e}>
              <input
                type={`checkbox`}
                checked={s.includes(e)}
                onChange={(t) =>
                  o(t.target.checked ? [...s, e] : s.filter((t) => t !== e))
                }
              />
              {jt[e] ?? e}
            </label>
          ))}
        </fieldset>
      );
    if (t.tipo === `bool`)
      return (
        <label className={`check`} key={t.id}>
          <input
            type={`checkbox`}
            checked={!!r}
            onChange={(e) => o(e.target.checked)}
          />
          {t.etiqueta}
        </label>
      );
    if (t.tipo === `opciones`)
      return (
        <label key={t.id}>
          {t.etiqueta}
          <select
            value={String(r ?? t.opciones?.[0] ?? ``)}
            onChange={(e) => o(e.target.value)}
          >
            {Mt.filter((e) => t.opciones?.includes(e.id)).map((e) => (
              <option value={e.id} key={e.id}>
                {e.etiqueta}
              </option>
            ))}
          </select>
        </label>
      );
    if (t.tipo === `elegir`) {
      let n = Ht(r);
      return (
        <div className={`con-elegir`} key={t.id}>
          <span>{t.etiqueta}</span>
          <strong className={`con-elegido`}>
            {n.length ? n.map((e) => e.nombre).join(`, `) : `Sin elegir`}
          </strong>
          <button
            type={`button`}
            className={`btn`}
            disabled={!e.conectado}
            onClick={() => void w(e, t)}
          >{`Elegir…`}</button>
        </div>
      );
    }
    return t.tipo === `ruta` ? (
      <div className={`con-elegir`} key={t.id}>
        <span>{t.etiqueta}</span>
        <strong className={`con-elegido`}>{String(r ?? `Sin elegir`)}</strong>
        <button
          type={`button`}
          className={`btn`}
          onClick={async () => {
            let e = await window.ocr.conectores.carpetaLocal();
            e && o(e);
          }}
        >{`Cambiar…`}</button>
      </div>
    ) : (
      <label key={t.id}>
        {t.etiqueta}
        <input
          type={
            t.tipo === `secreto`
              ? `password`
              : t.tipo === `numero`
                ? `number`
                : `text`
          }
          placeholder={t.ayuda}
          value={String(r ?? ``)}
          onChange={(e) =>
            o(
              t.tipo === `numero`
                ? e.target.value
                  ? Number(e.target.value)
                  : ``
                : e.target.value,
            )
          }
        />
      </label>
    );
  }
  let D = e.filter((e) => !e.avanzado),
    O = e.filter((e) => e.avanzado);
  return (
    <main className={`conectores`}>
      <h2>{`Conectar tus cuentas`}</h2>
      <p
        className={`muted`}
      >{`Elige dónde guardas tus archivos e inicia sesión. Solo se pide permiso para lo que marques. Lo que se trae llega al asistente como propuesta: nada cambia sin tu visto bueno. Del correo solo se leen mensajes y se preparan borradores; nunca se envía nada.`}</p>
      {d && <div className={`aviso`}>{d}</div>}
      <div className={`con-botones`}>
        {D.map((e) => {
          let t = e.auth !== `oauth` || e.configurado;
          return (
            <div className={`con-boton-caja`} key={e.tipo}>
              <button
                type={`button`}
                className={t ? `con-boton` : `con-boton apagado`}
                disabled={!t}
                onClick={() => void S(e)}
              >
                <span className={`con-icono`}>{Ut[e.tipo] ?? `🔗`}</span>
                {e.boton}
              </button>
              <small className={`muted`}>
                {t ? e.descripcion : e.aviso || Bt}
              </small>
            </div>
          );
        })}
      </div>
      {n.length > 0 && <h3>{`Tus conexiones`}</h3>}
      {n.map((e) => {
        let t = b(e.tipo),
          n = o[e.id],
          r = t?.campos ?? [],
          i = t?.avanzado ? [] : r.filter((e) => !e.avanzado),
          a = t?.avanzado ? r : r.filter((e) => e.avanzado);
        return (
          <section className={`card con-card`} key={e.id}>
            <div className={`fila`}>
              <span className={`con-icono`}>{Ut[e.tipo] ?? `🔗`}</span>
              <strong>{t?.nombre ?? e.nombre}</strong>
              {t?.auth === `oauth` && (
                <span className={e.conectado ? `ok` : `mal`}>
                  {e.conectado ? `● Conectado` : `○ Falta iniciar sesión`}
                </span>
              )}
              <span
                style={{
                  marginLeft: `auto`,
                }}
              />
              {t?.auth === `oauth` && !e.conectado && (
                <button className={`primary`} onClick={() => void x(e.id)}>
                  {t.boton}
                </button>
              )}
              {e.conectado && t?.auth === `oauth` && (
                <button
                  className={`btn`}
                  onClick={async () => {
                    await window.ocr.conectores.desconectar(e.id),
                      y(e.id, !0, `Sesión cerrada.`),
                      await v();
                  }}
                >{`Cerrar sesión`}</button>
              )}
              <button
                className={`btn`}
                onClick={async () => {
                  try {
                    u({
                      id: e.id,
                      l: await window.ocr.conectores.listar(e.id),
                    });
                  } catch (t) {
                    y(e.id, !1, zt(t));
                  }
                }}
              >{`Ver archivos`}</button>
              <button
                className={`btn`}
                onClick={async () => {
                  window.confirm(
                    `¿Quitar esta conexión? Se borra su inicio de sesión de este equipo.`,
                  ) && (await window.ocr.conectores.borrar(e.id), await v());
                }}
              >{`Quitar`}</button>
            </div>
            {(e.conectado || t?.auth !== `oauth`) && i.length > 0 && (
              <div className={`con-campos`}>{i.map((t) => E(e, t))}</div>
            )}
            {a.length > 0 && (
              <details className={`avanzado`}>
                <summary>{`Avanzado (para soporte técnico)`}</summary>
                <div className={`con-campos`}>{a.map((t) => E(e, t))}</div>
                {e.tipo === `webhook` && (
                  <button
                    className={`btn`}
                    onClick={() => void x(e.id)}
                  >{`Activar entrada`}</button>
                )}
              </details>
            )}
            <div className={`fila`}>
              <button className={`primary`} onClick={() => void C(e)}>
                {e.tipo === `google` && e.conectado
                  ? `Guardar y dar permiso`
                  : `Guardar`}
              </button>
              {n && <span className={n.ok ? `ok` : `mal`}>{n.txt}</span>}
            </div>
            {c?.id === e.id && (
              <table className={`tabla`}>
                <tbody>
                  {c.l.map((t) => (
                    <tr key={t.ref}>
                      <td>{t.nombre}</td>
                      <td className={`muted`}>{t.fecha?.slice(0, 10)}</td>
                      <td>
                        <button
                          className={`link`}
                          onClick={async () => {
                            try {
                              let n = await window.ocr.conectores.traer(
                                e.id,
                                t.ref,
                              );
                              await ae({
                                tipo: `documento`,
                                nombre: n.nombre,
                                ruta: n.ruta,
                                texto: n.texto,
                                ref: `${e.tipo}:${t.ref}`,
                              }),
                                f(
                                  `«${n.nombre}» se envió al asistente. Revisa las propuestas en Seguimiento → Actualizaciones.`,
                                );
                            } catch (t) {
                              y(e.id, !1, zt(t));
                            }
                          }}
                        >{`Enviar al asistente`}</button>
                      </td>
                    </tr>
                  ))}
                  {!c.l.length && (
                    <tr>
                      <td className={`muted`}>{`No hay archivos.`}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        );
      })}
      {O.length > 0 && (
        <details className={`avanzado`}>
          <summary>{`Avanzado (para soporte técnico)`}</summary>
          <p
            className={`muted`}
          >{`Conexiones especiales que configura el equipo de soporte.`}</p>
          <div className={`fila`}>
            {O.map((e) => (
              <button
                className={`btn`}
                onClick={() =>
                  _({
                    tipo: e.tipo,
                    cfg: {},
                  })
                }
                key={e.tipo}
              >
                {`+ `}
                {e.nombre}
              </button>
            ))}
          </div>
          {g && (
            <form
              className={`con-campos`}
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await window.ocr.conectores.guardar({
                    tipo: g.tipo,
                    nombre: b(g.tipo)?.nombre,
                    cfg: g.cfg,
                  }),
                    _(null),
                    await v();
                } catch (e) {
                  f(zt(e));
                }
              }}
            >
              {b(g.tipo)?.campos.map((e) => (
                <label key={e.id}>
                  {e.etiqueta}
                  <input
                    type={
                      e.tipo === `secreto`
                        ? `password`
                        : e.tipo === `numero`
                          ? `number`
                          : `text`
                    }
                    placeholder={e.ayuda}
                    value={String(g.cfg[e.id] ?? ``)}
                    onChange={(t) =>
                      _({
                        ...g,
                        cfg: {
                          ...g.cfg,
                          [e.id]:
                            e.tipo === `numero`
                              ? t.target.value
                                ? Number(t.target.value)
                                : ``
                              : t.target.value,
                        },
                      })
                    }
                  />
                </label>
              ))}
              <div className={`fila`}>
                <button className={`primary`}>{`Agregar`}</button>
                <button
                  type={`button`}
                  className={`btn`}
                  onClick={() => _(null)}
                >{`Cancelar`}</button>
              </div>
            </form>
          )}
        </details>
      )}
      {m && (
        <div
          className={`modal-fondo`}
          role={`dialog`}
          aria-label={m.campo.etiqueta}
        >
          <div className={`modal card con-picker`}>
            <h3>
              {`Elige: `}
              {m.campo.etiqueta}
            </h3>
            {Vt(m.campo.elegir) && (
              <div className={`con-migas`}>
                <button
                  className={`link`}
                  onClick={() => void w(m.con, m.campo, [])}
                >
                  {m.con.tipo === `google` ? `Mi unidad` : `Inicio`}
                </button>
                {m.ruta.map((e, t) => (
                  <span key={e.ref}>
                    {` › `}
                    <button
                      className={`link`}
                      onClick={() =>
                        void w(m.con, m.campo, m.ruta.slice(0, t + 1))
                      }
                    >
                      {e.nombre}
                    </button>
                  </span>
                ))}
              </div>
            )}
            {m.error && <p className={`mal`}>{m.error}</p>}
            {m.items ? (
              <ul className={`con-lista`}>
                {m.items.map((e) => {
                  let t = m.elegidos.some((t) => t.ref === e.ref);
                  return (
                    <li key={e.ref}>
                      {e.carpeta ? (
                        <button
                          className={`link`}
                          onClick={() => void w(m.con, m.campo, [...m.ruta, e])}
                        >
                          {`📁 `}
                          {e.nombre}
                          {` ›`}
                        </button>
                      ) : m.campo.multiple ? (
                        <label className={`check`}>
                          <input
                            type={`checkbox`}
                            checked={t}
                            onChange={() =>
                              h({
                                ...m,
                                elegidos: t
                                  ? m.elegidos.filter((t) => t.ref !== e.ref)
                                  : [
                                      ...m.elegidos,
                                      {
                                        ref: e.ref,
                                        nombre: e.nombre,
                                      },
                                    ],
                              })
                            }
                          />
                          {e.nombre}
                        </label>
                      ) : (
                        <button
                          className={`link`}
                          onClick={() =>
                            T({
                              ref: e.ref,
                              nombre: e.nombre,
                            })
                          }
                        >
                          {e.nombre}
                        </button>
                      )}
                    </li>
                  );
                })}
                {!m.items.length && !m.error && (
                  <li className={`muted`}>{`Aquí no hay nada.`}</li>
                )}
              </ul>
            ) : (
              <p className={`muted`}>{`Cargando…`}</p>
            )}
            <div className={`actions`}>
              <button
                className={`btn`}
                onClick={() => h(null)}
              >{`Cancelar`}</button>
              {Vt(m.campo.elegir) && (
                <button
                  className={`primary`}
                  onClick={() => {
                    let e = m.ruta[m.ruta.length - 1];
                    T(
                      e ?? {
                        ref: m.con.tipo === `google` ? `root` : ``,
                        nombre:
                          m.con.tipo === `google` ? `Mi unidad` : `Inicio`,
                      },
                    );
                  }}
                >{`Elegir esta carpeta`}</button>
              )}
              {m.campo.multiple && (
                <button className={`primary`} onClick={() => T(m.elegidos)}>
                  {`Listo (`}
                  {m.elegidos.length}
                  {`)`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
var Gt = {
  home: `M3 11l9-7 9 7v9h-6v-6H9v6H3z`,
  track: `M4 19V9M10 19V5M16 19v-7M22 19H2`,
  inbox: `M3 13l3-8h12l3 8v6H3zM3 13h5l1 2h6l1-2h5`,
  up: `M12 16V4M6 10l6-6 6 6M4 20h16`,
  queue: `M4 6h16M4 12h16M4 18h10`,
  check: `M4 12l5 5L20 6`,
  out: `M12 4v12M6 10l6 6 6-6M4 20h16`,
  plug: `M9 3v5M15 3v5M6 8h12v4a6 6 0 01-12 0zM12 18v3`,
  users: `M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3 3 0 010 6M22 20c0-3-2-5-4-5.5M12.5 8a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0`,
  brush: `M4 20c4 0 5-2 5-4a3 3 0 013-3l8-8-2-2-8 8a3 3 0 01-3 3c-2 0-3 2-3 6z`,
  spark: `M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z`,
};
function Icono({ n: e, s: t = 17, c: n }) {
  return (
    <svg
      viewBox={`0 0 24 24`}
      width={t}
      height={t}
      aria-hidden={`true`}
      style={{
        stroke: n ?? `currentColor`,
        fill: `none`,
        strokeWidth: 1.8,
        flex: `none`,
      }}
    >
      <path d={Gt[e] ?? ``} />
    </svg>
  );
}
var R = (e) => e.split(/[\\/]/).pop() || e,
  qt = (e) => String(e).replace(/^Error:\s*/, ``);
function PantallaCarga({ ir: e, onChange: t }) {
  let [n, r] = useState(!1),
    [i, a] = useState([]),
    [o, s] = useState([]),
    [c, u] = useState(!1),
    [d, f] = useState(``),
    [m, h] = useState(``);
  async function g(e) {
    let n = e.filter((e) => /\.(pdf|png|jpe?g|tiff?)$/i.test(e));
    if (!n.length) return h(`Solo se aceptan PDF o imágenes escaneadas.`);
    a(n), s([]), h(``), f(``), u(!0);
    try {
      let e = await _e(n, s),
        t = e.archivos.reduce((e, t) => e + t.en_revision, 0);
      f(
        `Lote ${e.lote} listo: ${e.archivos.reduce((e, t) => e + t.paginas, 0)} página(s) leídas, ${t} marca(s) por revisar.`,
      );
    } catch (e) {
      let t = qt(e);
      if (!/instrumento/i.test(t)) h(t);
      else {
        let e = await ye(n);
        a([]),
          f(
            j(e).replace(/\nPuedes preguntarme[\s\S]*/, ``) +
              `
Sugerencia (opcional): si son encuestas, agrega su formato con «Agregar formato de encuesta…» para leer las respuestas una por una.`,
          );
      }
    } finally {
      u(!1), t();
    }
  }
  async function _() {
    let e = await window.ocr.openJson();
    if (!e) return;
    let t = await window.ocr.openImage();
    try {
      let n = await window.ocr.call(`importar_plantilla`, {
        ruta_json: e,
        ruta_blank: t,
      });
      f(
        `Formato agregado: ${n.items} pregunta(s), ${n.casillas} casilla(s).` +
          (n.blank ? `` : ` Falta la imagen de la hoja en blanco.`),
      );
    } catch (e) {
      h(qt(e));
    }
  }
  let v = !c && o.length > 0 && o.length === i.length,
    y = o.reduce((e, t) => e + t.paginas, 0);
  return (
    <section className={`stage pad v5-main`} aria-label={`Subir lote`}>
      <header className={`v5-hd`}>
        <div>
          <h1>{tr(`Sube las encuestas escaneadas`)}</h1>
          <p
            className={`sub`}
          >{`Paso 1 de 3 · Lector reconoce el formato y lee las casillas.`}</p>
        </div>
      </header>
      <div className={`v5-cols`}>
        <div className={`v5-col`}>
          <div
            className={`v5-drop${n ? ` encima` : ``}`}
            onDragOver={(e) => {
              e.preventDefault(), r(!0);
            }}
            onDragLeave={() => r(!1)}
            onDrop={(e) => {
              e.preventDefault(),
                r(!1),
                g(
                  [...e.dataTransfer.files].map(
                    (e) => window.ocr.rutaDe(e) || e.name,
                  ),
                );
            }}
          >
            <div className={`v5-drop-ic`}>
              {createElement(Icono, {
                n: `up`,
                s: 26,
                c: `#fff`,
              })}
            </div>
            <h2>{tr(`Arrastra aquí tus PDF`)}</h2>
            <p
              className={`muted`}
            >{`Uno o muchos a la vez. El original nunca se modifica.`}</p>
            <button
              className={v ? `btn` : `btn primary`}
              disabled={c}
              onClick={() =>
                void window.ocr
                  .openPdf()
                  .then((e) => (e.length ? g(e) : void 0))
              }
            >
              {tr(`Elegir archivos`)}
            </button>
          </div>
          {i.length > 0 && (
            <div className={`card`}>
              <div className={`v5-hd`}>
                <b>
                  {`Subiendo `}
                  {i.length}
                  {` archivo(s)`}
                </b>
                <small className={`muted`}>
                  {o.length}
                  {` de `}
                  {i.length}
                </small>
              </div>
              {i.map((e, t) => {
                let n = o[t];
                return (
                  <div className={`v5-subida`} key={e}>
                    <span>
                      {R(e)}
                      {n && !n.duplicado && !n.error
                        ? ` · ${n.paginas} pág.`
                        : ``}
                    </span>
                    <small className={n?.error ? `error` : `muted`}>
                      {n
                        ? n.duplicado
                          ? `Ya estaba: no se repitió`
                          : n.error || `✓ Listo`
                        : t === o.length
                          ? `Leyendo…`
                          : `En espera`}
                    </small>
                    <div className={`v5-bar`}>
                      <i
                        style={{
                          width: n ? `100%` : t === o.length ? `45%` : `0%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {m && <p className={`err wb-msg`}>{m}</p>}
          {d && <p className={`wb-msg ok-msg v5-pre`}>{d}</p>}
        </div>
        <div className={`v5-col angosta`}>
          <div className={`card`}>
            <b>{`Consejos para un buen escaneo`}</b>
            <ul className={`muted v5-lista`}>
              <li>{`Hojas derechas, a 300 dpi`}</li>
              <li>{`Una encuesta por página`}</li>
              <li>{`Evita sombras y grapas`}</li>
            </ul>
          </div>
          <div className={`card`}>
            <b>
              {`¿Cuestionario nuevo?`}
              {` `}
              {createElement(Pista, {
                texto: `Solo una vez por cuestionario: el archivo de formato que entrega soporte y una imagen de la hoja en blanco.`,
              })}
            </b>
            <p
              className={`muted`}
            >{`Agrega su formato para que Lector sepa dónde están las casillas.`}</p>
            <button
              className={`link`}
              onClick={() => void _()}
            >{`Agregar formato de encuesta…`}</button>
          </div>
          <button
            className={v ? `btn primary v5-ancho` : `btn v5-ancho`}
            disabled={!v}
            onClick={() => e(`revision`)}
          >
            {`Continuar · revisar `}
            {y}
            {` página(s) →`}
          </button>
        </div>
      </div>
    </section>
  );
}
var Yt = {
    doble_marca: `Vemos dos casillas marcadas. ¿Cuál quiso elegir?`,
    sin_marca: `No vemos ninguna marca. ¿Quedó sin respuesta?`,
    marca_tenue: `La marca es muy tenue. ¿Cuál es?`,
    posible_borron: `Parece que hay un borrón. ¿Cuál quedó?`,
    dudosa: "La lectura automática no quedó segura. ¿Cuál es la respuesta?",
  },
  Xt = (e) =>
    String(e.opciones ?? ``)
      .split(
        `
`,
      )
      .filter(Boolean)
      .map((e) => e.split(`	`));
function Zt(e) {
  try {
    let t = JSON.parse(e.tintas || `[]`),
      n = t.reduce((e, t) => e + Math.max(0, t), 0);
    return n ? t.map((e) => Math.max(0, e) / n) : [];
  } catch {
    return [];
  }
}
function PantallaRevision({ ir: e, onChange: t }) {
  let [n, r] = useState(null),
    [i, a] = useState(0),
    [o, s] = useState({
      id: 0,
      v: null,
    }),
    [c, u] = useState([]),
    [d, f] = useState({
      imagen: null,
    }),
    [m, h] = useState(``),
    g = useCallback(async () => {
      r(await window.ocr.call(`cola_revision`));
    }, []);
  useEffect(() => {
    g();
  }, [g]);
  let _ = n?.[Math.min(i, (n?.length ?? 1) - 1)],
    v = useMemo(() => (_ ? Xt(_) : []), [_]),
    y = useMemo(() => (_ ? Zt(_) : []), [_]),
    b = y.length ? y.indexOf(Math.max(...y)) : -1,
    x = _ && o.id === _.id ? o.v : b >= 0 && v[b] ? v[b][0] : void 0,
    S = useCallback(
      (e) =>
        _ &&
        s({
          id: _.id,
          v: e,
        }),
      [_],
    );
  useEffect(() => {
    _ &&
      window.ocr
        .call(`pagina_imagen`, {
          pagina_id: _.pagina_id,
        })
        .then(f)
        .catch(() =>
          f({
            imagen: null,
          }),
        );
  }, [_?.id]);
  let w = useCallback(
    async (e) => {
      if (_ && e !== void 0) {
        h(``);
        try {
          await window.ocr.call(`revisar`, {
            respuesta_id: _.id,
            despues: e,
            ...(e === null
              ? {
                  motivo: `sin respuesta`,
                }
              : {}),
          });
          let n =
            e === null
              ? `Sin respuesta`
              : (v.find((t) => t[0] === e)?.[1] ?? e);
          u((e) =>
            [
              {
                id: _.id,
                clave: _.clave,
                valor: n,
              },
              ...e,
            ].slice(0, 8),
          ),
            await g(),
            t();
        } catch (e) {
          h(String(e).replace(/^Error:\s*/, ``));
        }
      }
    },
    [_, v, g, t],
  );
  useEffect(() => {
    let e = (e) => {
      if (e.target?.tagName !== `INPUT`) {
        if (/^[1-9]$/.test(e.key) && v[Number(e.key) - 1])
          S(v[Number(e.key) - 1][0]);
        else if (e.key === `0`) S(null);
        else if (e.key === `Enter`) w(x);
        else if (e.key === `ArrowLeft`) a((e) => Math.max(0, e - 1));
        else if (e.key === `ArrowRight`)
          a((e) => Math.min((n?.length ?? 1) - 1, e + 1));
        else return;
        e.preventDefault();
      }
    };
    return (
      window.addEventListener(`keydown`, e),
      () => window.removeEventListener(`keydown`, e)
    );
  }, [v, x, S, w, n]);
  let T = (n?.length ?? 0) + c.length,
    E = x === null ? `Sin respuesta` : v.find((e) => e[0] === x)?.[1],
    D =
      _ && d.ancho && _.bbox_w
        ? _.bbox_w <= 1
          ? {
              x: _.bbox_x,
              y: _.bbox_y,
              w: _.bbox_w,
              h: _.bbox_h,
            }
          : {
              x: _.bbox_x / d.ancho,
              y: _.bbox_y / d.alto,
              w: _.bbox_w / d.ancho,
              h: _.bbox_h / d.alto,
            }
        : null;
  return (
    <section className={`stage pad v5-main`} aria-label={`Revisar`}>
      <header className={`v5-hd`}>
        <div>
          <h1>{tr(`Revisa las marcas dudosas`)}</h1>
          <p className={`sub`}>
            {n === null
              ? `Cargando…`
              : n.length
                ? `Marca ${Math.min(i, n.length - 1) + 1} de ${n.length} · Lector ya resolvió las demás.`
                : `No queda nada por revisar.`}
          </p>
        </div>
        {T > 0 && (
          <div className={`v5-avance`}>
            <small className={`muted`}>
              {c.length}
              {` de `}
              {T}
              {` revisadas`}
            </small>
            <div className={`v5-bar`}>
              <i
                style={{
                  width: `${(100 * c.length) / T}%`,
                }}
              />
            </div>
          </div>
        )}
      </header>
      {m && <p className={`err wb-msg`}>{m}</p>}
      {n !== null && !_ ? (
        <div className={`v5-vacio grande`}>
          <b>{`¡Todo revisado!`}</b>
          {`No hay marcas dudosas pendientes. Lo que se dejó sin respuesta sale vacío, nunca como 0.`}
          <button
            className={`btn primary`}
            onClick={() => e(`exportacion`)}
          >{`Ir a exportar →`}</button>
        </div>
      ) : _ ? (
        <div className={`v5-cols`}>
          <div className={`card v5-hoja`}>
            <div className={`v5-hd`}>
              <b>
                {_.documento}
                {` · pág. `}
                {_.pagina_num}
              </b>
              <small className={`muted`}>
                {`Encuesta `}
                {_.folio ?? `—`}
              </small>
            </div>
            {d.imagen ? (
              <div className={`v5-hoja-img`}>
                <img src={d.imagen} alt={`Hoja ${_.pagina_num}`} />
                {D && (
                  <span
                    className={`v5-caja`}
                    style={{
                      left: `${D.x * 100}%`,
                      top: `${D.y * 100}%`,
                      width: `${D.w * 100}%`,
                      height: `${D.h * 100}%`,
                    }}
                  />
                )}
              </div>
            ) : (
              <div
                className={`v5-vacio`}
              >{`La vista de la hoja no está disponible en este equipo.`}</div>
            )}
          </div>
          <div className={`v5-col angosta ancha`}>
            <div className={`card v5-duda`}>
              <div className={`v5-hd`}>
                <span className={`pill p-w`}>
                  {`Pregunta `}
                  {_.clave}
                </span>
                <small className={`muted`}>
                  {`Lote `}
                  {_.lote_id}
                </small>
              </div>
              <h2>
                {`«`}
                {_.clave}
                {`»`}
              </h2>
              <p className={`muted`}>
                {Yt[_.aviso] ?? _.aviso}
                {` `}
                {createElement(Pista, {
                  texto: `Lo que elijas se guarda con tu nombre en el historial; se puede cambiar después.`,
                })}
              </p>
              <div role={`radiogroup`} aria-label={`Opciones`}>
                {v.map(([e, t], n) => (
                  <button
                    role={`radio`}
                    aria-checked={x === e}
                    className={`v5-op${x === e ? ` on` : ``}`}
                    onClick={() => S(e)}
                    key={e}
                  >
                    <kbd>{n + 1}</kbd>
                    <span>{t}</span>
                    {y[n] !== void 0 && (
                      <small className={`muted`}>
                        {n === b ? `Lector cree esta · ` : ``}
                        {Math.round(y[n] * 100)}
                        {` %`}
                      </small>
                    )}
                  </button>
                ))}
                <button
                  role={`radio`}
                  aria-checked={x === null}
                  className={`v5-op tenue${x === null ? ` on` : ``}`}
                  onClick={() => S(null)}
                >
                  <kbd>{`0`}</kbd>
                  <span>{`Dejar sin respuesta`}</span>
                </button>
              </div>
              <button
                className={`btn primary v5-ancho`}
                disabled={x === void 0}
                onClick={() => void w(x)}
              >
                {x === void 0
                  ? `Elige una opción`
                  : `Confirmar «${E}» y seguir ↵`}
              </button>
              <small className={`muted v5-atajos`}>
                {`Atajos: 1–`}
                {Math.min(9, v.length)}
                {` elige · 0 sin respuesta · ↵ confirma · ← → anterior/siguiente`}
              </small>
            </div>
            {c.length > 0 && (
              <div className={`card`}>
                <b>{`Revisadas ahora`}</b>
                <table className={`v5-mini`}>
                  <tbody>
                    {c.map((e) => (
                      <tr key={e.id}>
                        <td>{e.clave}</td>
                        <td>{e.valor}</td>
                        <td>{`✓`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
var $t = [
  [
    `up`,
    `Sube los PDF`,
    `Arrastra las encuestas escaneadas. El original nunca se modifica.`,
  ],
  [
    `check`,
    `Revisa lo dudoso`,
    `Lector te muestra solo las marcas que no pudo leer con seguridad.`,
  ],
  [`out`, `Exporta`, `Descarga el Excel o CSV listo para el análisis.`],
];
function Bienvenida({ cerrar: e }) {
  return (
    <div className={`v5-modal`} role={`dialog`} aria-label={`Bienvenida`}>
      <div className={`card v5-bienvenida`}>
        <h1>{tr(`Bienvenido a Lector`)}</h1>
        <p
          className={`muted`}
        >{`Convierte encuestas en papel en datos, en tres pasos.`}</p>
        <div className={`v5-tres`}>
          {$t.map(([e, t, n], r) => (
            <div className={`card`} key={e}>
              <div className={`v5-drop-ic chico`}>
                {createElement(Icono, {
                  n: e,
                  s: 18,
                  c: `#fff`,
                })}
              </div>
              <b>
                {r + 1}
                {`. `}
                {t}
              </b>
              <p className={`muted`}>{n}</p>
            </div>
          ))}
        </div>
        <p className={`muted`}>
          {`¿Dudas? Escríbele al `}
          <b>{`Asistente`}</b>
          {` en palabras normales.`}
        </p>
        <div className={`v5-fila`}>
          <button className={`btn primary`} onClick={() => e(`carga`)}>
            {tr(`Empezar · subir mi primer lote`)}
            {` →`}
          </button>
          <button className={`link`} onClick={() => e()}>{`omitir`}</button>
        </div>
      </div>
    </div>
  );
}
var tn = [
    [
      `Trabajo`,
      [
        [`asistente`, `Asistente IA`, `spark`],
        [`tablero`, `Panel de avance`, `home`],
        [`seguimiento`, `Seguimiento`, `track`],
        [`bandeja`, `Bandeja de entrada`, `inbox`],
      ],
    ],
    [
      `Encuestas`,
      [
        [`carga`, `1 · Subir lote`, `up`],
        [`cola`, `Procesando`, `queue`],
        [`revision`, `2 · Revisar`, `check`],
        [`exportacion`, `3 · Exportar`, `out`],
      ],
    ],
    [
      `Administración`,
      [
        [`conectores`, `Conectores`, `plug`],
        [`usuarios`, `Usuarios y roles`, `users`],
        [`personalizacion`, `Personalización`, `brush`],
      ],
    ],
  ],
  nn = {
    carga: 1,
    cola: 1,
    revision: 2,
    exportacion: 3,
  },
  rn = `lector.bienvenida`;
function PasosEncuesta({ paso: e, ir: t }) {
  return (
    <ol className={`v5-pasos`} aria-label={`Pasos`}>
      {[
        [`Subir`, `carga`],
        [`Revisar`, `revision`],
        [`Exportar`, `exportacion`],
      ].map(([n, r], i) => (
        <li
          className={i + 1 < e ? `hecho` : i + 1 === e ? `actual` : ``}
          aria-current={i + 1 === e ? `step` : void 0}
          key={n}
        >
          <button onClick={() => t(r)}>
            <i>{i + 1 < e ? `✓` : i + 1}</i>
            {tr(n)}
          </button>
        </li>
      ))}
    </ol>
  );
}
function Aplicacion() {
  let e = useIdioma(),
    [t, n] = useState(`asistente`),
    [r, i] = useState(null),
    [a, o] = useState(!1),
    [s, c] = useState(0),
    [u, d] = useState(!1),
    [f, m] = useState(!1),
    h = useCallback(() => m(!1), []),
    [_, y] = useState({
      bandeja: 0,
      cola: 0,
    }),
    [b, x] = useState(``);
  useEffect(() => {
    window.ocr
      .call(`estado_inicial`)
      .then((e) => {
        o(e.proyectos === 0),
          e.proyectos > 0 && !localStorage.getItem(rn) && d(!0);
      })
      .catch(() => {});
  }, []),
    useEffect(
      () =>
        window.ocr.conectores.alNuevo((e) => {
          let t = e;
          ae({
            tipo: `documento`,
            nombre: t.nombre,
            ruta: t.ruta,
            texto: t.texto,
            ref: `conector:` + t.conector,
          }).catch(() => void 0);
        }),
      [],
    ),
    useEffect(() => {
      let e = (e) => {
        e.key === `F1` && (e.preventDefault(), d(!0));
      };
      return (
        window.addEventListener(`keydown`, e),
        () => window.removeEventListener(`keydown`, e)
      );
    }, []);
  let [T, E] = useState(Ge),
    [D, O] = useState(() => Qe(Ge));
  useEffect(() => {
    Ze(D);
  }, [D]),
    useEffect(() => {
      (async () => {
        let e = {
          ...Ge,
          ...(await window.ocr.brand()),
        };
        E(e), O(Qe(e));
      })();
    }, []);
  let k = useCallback(async () => {
    try {
      i(await window.ocr.call(`stats`));
      let e =
          (await window.ocr.call(`bandeja_listar`, {}).catch(() => [])) ?? [],
        t =
          (await window.ocr
            .call(`list`, {
              table: `lotes`,
            })
            .catch(() => [])) ?? [],
        n =
          (await window.ocr
            .call(`list`, {
              table: `usuarios`,
            })
            .catch(() => [])) ?? [];
      y({
        bandeja: Array.isArray(e)
          ? e.filter(
              (e) => e.estado === `por_confirmar` || e.estado === `propuesto`,
            ).length
          : 0,
        cola: Array.isArray(t)
          ? t.filter((e) => e.estado === `pendiente`).length
          : 0,
      });
      let r = String(n[0]?.nombre ?? ``).trim();
      x(
        r
          .split(/\s+/)
          .slice(0, 2)
          .map((e) => e[0]?.toUpperCase() ?? ``)
          .join(``),
      );
    } catch {}
  }, []);
  useEffect(() => {
    k();
  }, [t, k]),
    useEffect(() => {
      let e = () => void k();
      window.addEventListener(`proyecto`, e);
      let t = window.ocr.conectores.alBandeja(e);
      return () => {
        window.removeEventListener(`proyecto`, e), t();
      };
    }, [k]);
  let ee = (e) =>
      e === `revision`
        ? (r?.en_revision ?? 0)
        : e === `bandeja`
          ? _.bandeja
          : e === `cola`
            ? _.cola
            : 0,
    te = nn[t];
  return (
    <div className={`app v5`} lang={e} key={s}>
      {a &&
        createElement(Ct, {
          listo: () => {
            o(!1), c((e) => e + 1), d(!localStorage.getItem(rn));
          },
        })}
      {u &&
        !a &&
        createElement(Bienvenida, {
          cerrar: (e) => {
            localStorage.setItem(rn, `1`), d(!1), e && n(e);
          },
        })}
      <header className={`v5-top`}>
        {createElement(St, null)}
        <button
          className={`v5-tip`}
          aria-label={`Guía rápida (F1)`}
          title={`Guía rápida (F1)`}
          onClick={() => d(!0)}
        >{`?`}</button>
        {te &&
          createElement(PasosEncuesta, {
            paso: te,
            ir: n,
          })}
        <div className={`v5-top-der`}>
          <span className={`conf-pill`}>
            {`🔒 `}
            {tr(`CONFIDENCIAL · datos de menores y víctimas`)}
          </span>
          <div className={`v5-lang`} role={`group`} aria-label={`Idioma`}>
            <button
              className={e === `es` ? `on` : ``}
              onClick={() => S(`es`)}
            >{`ES`}</button>
            <button
              className={e === `en` ? `on` : ``}
              onClick={() => S(`en`)}
            >{`EN`}</button>
          </div>
          {createElement(MenuAvisos, {
            alConfirmar: () => n(`asistente`),
          })}
          <span className={`v5-av`} title={`Cuenta de este equipo`}>
            {b || `··`}
          </span>
        </div>
      </header>
      {createElement(BannerActualizacion, null)}
      <div className={`hive`}>
        <aside className={`rail v5-side`}>
          <div className={`brand`}>
            <div className={`logo-slot`}>
              <img
                src={
                  D.logo ||
                  `data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='256'%20height='256'%20viewBox='0%200%20256%20256'%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231d4ed8'/%3e%3cstop%20offset='.6'%20stop-color='%232563eb'/%3e%3cstop%20offset='1'%20stop-color='%2360a5fa'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%231d4ed8'/%3e%3cstop%20offset='1'%20stop-color='%233b82f6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='0'%20y1='1'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%232563eb'/%3e%3cstop%20offset='1'%20stop-color='%2393c5fd'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='256'%20height='256'%20rx='58'%20fill='%23eff6ff'/%3e%3crect%20x='1'%20y='1'%20width='254'%20height='254'%20rx='57'%20fill='none'%20stroke='%232563eb'%20stroke-opacity='.12'%20stroke-width='2'/%3e%3cg%20transform='translate(128%20128)%20scale(1.12)%20translate(-135%20-133)'%3e%3cpolygon%20points='62,99%2095,67%2095,109%2062,138'%20fill='url(%23c)'%20fill-opacity='.75'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='62,150%20160,47%20208,47%2062,198'%20fill='url(%23a)'%20fill-opacity='.85'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpolygon%20points='111,156%20130,135%20200,199%20151,199'%20fill='url(%23b)'%20fill-opacity='.85'%20stroke='%2393c5fd'%20stroke-width='2'%20stroke-linejoin='round'/%3e%3cpath%20d='M89%20125L110%20148'%20stroke='%23fff'%20stroke-opacity='.6'%20stroke-width='1.6'/%3e%3cpath%20d='M62%20138V100M62%20196V151L140%2068'%20fill='none'%20stroke='%239AC43A'%20stroke-opacity='0.8'%20stroke-width='2.2'%20stroke-linecap='round'/%3e%3cpath%20d='M163%2050H204'%20stroke='%23fff'%20stroke-opacity='.7'%20stroke-width='1.4'%20stroke-linecap='round'/%3e%3c/g%3e%3c/svg%3e`
                }
                alt={``}
              />
            </div>
            <strong>{D.shortName}</strong>
          </div>
          <nav>
            {tn.map(([e, r]) => (
              <div className={`v5-grupo`} key={e}>
                <div className={`v5-grp`}>{tr(e)}</div>
                {r.map(([e, r, i]) => (
                  <button
                    className={t === e ? `nav on` : `nav`}
                    aria-current={t === e ? `page` : void 0}
                    onClick={() => n(e)}
                    key={e}
                  >
                    {createElement(Icono, {
                      n: i,
                    })}
                    <span>{tr(r)}</span>
                    {ee(e) ? <span className={`count`}>{ee(e)}</span> : null}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <button className={`v5-help`} onClick={() => n(`asistente`)}>
            <b>{tr(`¿Dudas?`)}</b>
            {tr(`Pregunta al Asistente o abre la guía rápida (F1).`)}
          </button>
        </aside>
        {t === `asistente`
          ? createElement(PantallaAsistente, {
              ir: n,
            })
          : t === `tablero`
            ? createElement(PantallaTablero, {
                stats: r,
                ir: n,
              })
            : t === `carga`
              ? createElement(PantallaCarga, {
                  ir: n,
                  onChange: () => void k(),
                })
              : t === `revision`
                ? createElement(PantallaRevision, {
                    ir: n,
                    onChange: () => void k(),
                  })
                : t === `seguimiento`
                  ? createElement(PantallaSeguimiento, null)
                  : t === `bandeja`
                    ? createElement(PantallaBandeja, {
                        onChange: () => void k(),
                      })
                    : t === `conectores`
                      ? createElement(PantallaConectores, null)
                      : t === `personalizacion`
                        ? createElement(PantallaPersonalizacion, {
                            brand: D,
                            base: T,
                            onSave: (e) => {
                              $e(e), O(e);
                            },
                            onReset: () => {
                              et(), O(T);
                            },
                            key: JSON.stringify(D),
                          })
                        : createElement(PantallaOperacion, {
                            screen: t,
                            stats: r,
                            onChange: () => void k(),
                            key: t,
                          })}
      </div>
      {createElement(BarraVersion, {
        abrir: () => m(!0),
      })}
      {f &&
        createElement(ModalActualizacion, {
          cerrar: h,
        })}
    </div>
  );
}
export {
  Aplicacion,
  fusionarSeguimiento,
  alcancesConector,
  validarConector,
  catalogoConectores,
  BarraVersion,
  PantallaAsistente,
  PantallaTablero,
  PantallaCarga,
  PantallaRevision,
  PantallaSeguimiento,
  PantallaBandeja,
  PantallaConectores,
  PantallaPersonalizacion,
  PantallaOperacion,
  Bienvenida,
  Icono,
  useIdioma,
  tr,
};
