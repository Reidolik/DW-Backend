//PPP
function bonificacionDTO372001Total(boni372001, bonoIncentivo) {
    return (boni372001 + bonoIncentivo).toFixed(2)
}

function diasLaborados(diasVacaciones, ausencias, suspenciones, fechaAlta, periodoInicio, periodoFin, susDisciplinarias) {
    let diasNoLaborados = 0
    let diasPorPagar = 0
    if (fechaAlta.getTime() >= periodoInicio.getTime() && fechaAlta.getTime() <= periodoFin.getTime()) {
        diasNoLaborados = (fechaAlta.getUTCDate() - periodoInicio.getUTCDate())
    } else {
        diasNoLaborados = 0
    }
    diasNoLaborados = diasNoLaborados + ausencias + suspenciones + susDisciplinarias + diasVacaciones
    if (((periodoFin.getUTCDate() - periodoInicio.getUTCDate())+1) === 16) {
        if (diasNoLaborados === 0) {
            diasPorPagar = 15
        } else {
            diasPorPagar = 16 - diasNoLaborados
        }
    } else if (((periodoFin.getUTCDate() - periodoInicio.getUTCDate())+1) === 31){
        if (diasNoLaborados === 0) {
            diasPorPagar = 30
        } else {
            diasPorPagar = 31 - diasNoLaborados
        }
    } else {
        diasPorPagar = (((periodoFin.getUTCDate() - periodoInicio.getUTCDate())+1) - diasNoLaborados)
    }
    return diasPorPagar
}

function horasSimples(horas, salarioBase) {
    return (horas * ((salarioBase/30)/8)*1.5).toFixed(2)
}

function horasDobles(horas, salarioBase) {
    return (horas * ((salarioBase/30)/8)*2).toFixed(2)
}

function salarioBaseDevengado(salario, diasLaborados) {
    return ((salario/30)*diasLaborados).toFixed(2)
}

function bonifDevengado(bonif, diasLaborados) {
    return ((bonif/30)*diasLaborados).toFixed(2)
}

function bonifTotalDevengado(bonifDevengado, bono) {
    return (bonifDevengado + bono).toFixed(2)
}

function totalDevengado(salarioBaseDevengado, bonifTotalDevengado, horasSimples, horasDobles, comisiones, anticipo, devIsr) {
    return (salarioBaseDevengado + bonifTotalDevengado + horasSimples + horasDobles + comisiones + anticipo + devIsr).toFixed(2)
}

function igss(salarioBase, horasSimples, horasDobles, comisiones, jubilado) {
    let porcentaje = 0
    if (jubilado) {
        porcentaje = 0.03
    } else {
        porcentaje = 0.0483
    }
    return ((salarioBase + horasSimples + horasDobles + comisiones) * porcentaje).toFixed(2)
}

function totalDeducciones(igss, isr, medicina, almuerzos, descJudicial, anticipo, irtra, uniformes, boletoOrnato, isrNoAplicado, bantrab, bi) {
    return (igss + isr + medicina + almuerzos + descJudicial + anticipo + irtra + uniformes + boletoOrnato + isrNoAplicado + bantrab + bi).toFixed(2)
}

function  liquidoRecibir(totalDevengado, totalDeducciones) {
    return (totalDevengado - totalDeducciones).toFixed(2)
}

function reajuste(valorAnterior, nuevoValor) {
    return (nuevoValor - valorAnterior).toFixed(2)
}

//planilla vacaciones

function salarioPromedio(salarios) {
    //necesitas salario base, hrs extra (simples y dobles) y comisiones

}

function precioDiaHabil(salarioPromedio) {
    return (salarioPromedio / 30)
}

function precioDiaSeptimo(salarioBase) {
    return (salarioBase / 30)
}

function montoDiaHabil(precioDH, diasHabiles) {
    return (precioDH * diasHabiles)
}

function montoDiaSeptimo(precioDS, diasSeptimos) {
    return (precioDS * diasSeptimos)
}

function montoTotal(montoDH, montoDS) {
    return (montoDH * montoDS)
}

function igssVacaciones(montoTotal, jubilado) {
    let porcentaje = 0.0483
    if (jubilado) {
        porcentaje = 0.03
    }
    return (montoTotal * porcentaje)
}

function liquidoRecibirVacaciones(montoTotal, igss) {
    return (montoTotal - igss)
}

module.exports = {
    bonificacionDTO372001Total,
    diasLaborados,
    horasSimples,
    horasDobles,
    salarioBaseDevengado,
    bonifDevengado,
    bonifTotalDevengado,
    totalDevengado,
    igss,
    totalDeducciones,
    liquidoRecibir,
    reajuste,
    salarioPromedio,
    precioDiaHabil,
    precioDiaSeptimo,
    montoDiaHabil,
    montoDiaSeptimo,
    montoTotal,
    igssVacaciones,
    liquidoRecibirVacaciones
}