/**
 * Datos que usaremos para calcular montos minimos, maximos y linea optima de cretido.
 * Decidi usar objecto con claves y valores para que me fuera mas facil optener los valores
 */
const MONTOS_MINIMOS_M = {
  A: {
    "0-26": 100,
    27: 400,
    28: 900,
    29: 100,
    "30-inf": 600,
  },
  B: {
    "0-26": 1000,
    27: 600,
    28: 1000,
    29: 1000,
    "30-inf": 1000,
  },
  C: {
    "0-26": 400,
    27: 200,
    28: 200,
    29: 1000,
    "30-inf": 600,
  },
  D: {
    "0-26": 400,
    27: 300,
    28: 500,
    29: 900,
    "30-inf": 1000,
  },
};

const MONTOS_MINIMOS_F = {
  A: {
    "0-24": 800,
    25: 800,
    26: 800,
    27: 600,
    "28-inf": 200,
  },
  B: {
    "0-24": 800,
    25: 700,
    26: 100,
    27: 600,
    "28-inf": 700,
  },
  C: {
    "0-24": 200,
    25: 900,
    26: 700,
    27: 800,
    "28-inf": 100,
  },
  D: {
    "0-24": 500,
    25: 1000,
    26: 600,
    27: 400,
    "28-inf": 700,
  },
};

const MONTOS_MAXIMOS_M = {
  A: {
    "0-26": 4900,
    27: 4700,
    28: 4600,
    29: 4600,
    "30-inf": 4500,
  },
  B: {
    "0-26": 4700,
    27: 4400,
    28: 5000,
    29: 4400,
    "30-inf": 4900,
  },
  C: {
    "0-26": 5000,
    27: 4700,
    28: 5000,
    29: 4200,
    "30-inf": 4600,
  },
  D: {
    "0-26": 4400,
    27: 4700,
    28: 4300,
    29: 4900,
    "30-inf": 4300,
  },
};

const MONTOS_MAXIMOS_F = {
  A: {
    "0-24": 4000,
    25: 4200,
    26: 4100,
    27: 4200,
    "28-inf": 4500,
  },
  B: {
    "0-24": 4700,
    25: 4200,
    26: 4500,
    27: 4300,
    "28-inf": 4400,
  },
  C: {
    "0-24": 4600,
    25: 4900,
    26: 4600,
    27: 4700,
    "28-inf": 4000,
  },
  D: {
    "0-24": 5000,
    25: 4900,
    26: 4700,
    27: 5000,
    "28-inf": 4300,
  },
};

/**
 * Array de objectos que describen casos y los usaremos para calcular montos, minimos, maximos y linea optima.
 * Estos casos se describene en el PDF
 */
const casos = [
  {
    tipoNomina: "A",
    fechaPrimerEmpleo: new Date("2022-06-12"),
    genero: "f",
  },
  {
    tipoNomina: "B",
    fechaPrimerEmpleo: new Date("1993-12-30"),
    genero: "f",
  },
  {
    tipoNomina: "C",
    fechaPrimerEmpleo: new Date("2020-09-19"),
    genero: "m",
  },
  {
    tipoNomina: "D",
    fechaPrimerEmpleo: new Date("2019-01-15"),
    genero: "m",
  },
];

/**
 * Funcion axiliar que se encarga de calcular el número de meses transcurridos desde la fecha de inicio de empleo dada.
 *
 * @param {Date} fechaPrimerEmpleo - La fecha de inicio del primer empleo.
 * @returns {number} El número total de meses desde la fecha de inicio del empleo.
 */
const calcularMeses = (fechaPrimerEmpleo) => {
  const hoy = new Date();
  const meses =
    (hoy.getFullYear() - fechaPrimerEmpleo.getFullYear()) * 12 +
    (hoy.getMonth() - fechaPrimerEmpleo.getMonth());
  return meses;
};

/**
 * Funcion auxiliar que se encarga de optener  el rango de meses basado en la cantidad de meses y el género.
 *
 * @param {number} meses - La cantidad de meses desde el primer empleo.
 * @param {string} genero - El género del individuo, "m" para masculino y cualquier otro valor para femenino.
 * @returns {string} El rango de meses correspondiente en formato de cadena.
 */
const obtenerRangoMeses = (meses, genero) => {
  if (genero === "m") {
    if (meses < 26) return "0-26";
    if (meses === 27) return "27";
    if (meses === 28) return "28";
    if (meses === 29) return "29";
    return "30-inf";
  } else {
    if (meses < 24) return "0-24";
    if (meses === 25) return "25";
    if (meses === 26) return "26";
    if (meses === 27) return "27";
    return "28-inf";
  }
};

/**
 * Funcion que se habla en el PDF, se va encargar de calcular el monto minimo, maximo y liena optima de credito.
 *
 * @param {string} tipoNomina - El tipo de nomina
 * @param {Date} fechaPrimerEmpleo - Fecha del primer emplero
 * @param {string} genero - EL genero, "m" para masculino y "f" femenuno
 * @returns {Object} retorna un objecto que contiene:
 *  - {number} montoMinimo: El monto minimo de credito
 *  - {number} montoMaximo: El monto maximo de credito
 *  - {number} recomendacionLinea: La ninea optima recomendada de cretido
 */
const calculoMotor = (tipoNomina, fechaPrimerEmpleo, genero) => {
  const meses = calcularMeses(fechaPrimerEmpleo);
  const rango = obtenerRangoMeses(meses, genero);

  let montoMinimo;
  let montoMaximo;

  if (genero === "m") {
    montoMinimo = MONTOS_MINIMOS_M[tipoNomina][rango];
    montoMaximo = MONTOS_MAXIMOS_M[tipoNomina][rango];
  } else {
    montoMinimo = MONTOS_MINIMOS_F[tipoNomina][rango];
    montoMaximo = MONTOS_MAXIMOS_F[tipoNomina][rango];
  }

  const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
  const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
  const lineaOptima = Math.max(p1, p2);

  return {
    montoMinimo,
    montoMaximo,
    recomendacionLinea: Math.round(lineaOptima),
  };
};

/**
 * Vamos a iterear sobre cada caso y por cada caso vamos a calcular el monto, minimo, maximo y la linea optima
 * una ves calculados los datos vamos a retornar un objecto que describe el caso,  tipo de nomina, fecha de primer empleo
 * monto mino, maximo, linea optima
 */

const resultadosFormateados = casos.map((caso, index) => {
  const resultado = calculoMotor(
    caso.tipoNomina,
    caso.fechaPrimerEmpleo,
    caso.genero
  );
  return {
    "Caso #": index + 1,
    "Tipo de Nomina": caso.tipoNomina,
    "Fecha Primer Empleo": caso.fechaPrimerEmpleo.toLocaleDateString(),
    Genero: caso.genero,
    "Monto Minimo": resultado.montoMinimo,
    "Monto Maximo": resultado.montoMaximo,
    "Línea Optima": resultado.recomendacionLinea,
  };
});

// muestra  los datos en un objecto
console.log(resultadosFormateados);

// muestra  los datos en un tabla como se muestra en el PDF
console.table(resultadosFormateados);
