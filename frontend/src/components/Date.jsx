import "./date.css";
export const Fecha = () => {
  const FECHA = new Date();
  const nDIA = FECHA.getDate();
  const MES = FECHA.getMonth();
  const ANO = FECHA.getFullYear();

  const nombresDeLosDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const nombresDeLosMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diaDeSemana = FECHA.getDay();
  const nombreDelDia = nombresDeLosDias[diaDeSemana];
  const nombreDelMes = nombresDeLosMeses[MES];

  const diaFormateado = nDIA < 10 ? "0" + nDIA : nDIA;

  return (
    <>
      <div>
        <p className="date">
          {nombreDelDia}, {diaFormateado} de {nombreDelMes} de {ANO}
        </p>
      </div>
    </>
  );
};
