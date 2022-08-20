//calcular horas afastamento
//calcular carga horária
//incluir risaer na carga horária
//ordenar operadores por carga horária
//preencher automaticamente a escala
// ip_GridProps['demo'].selectedCell.row


var telaAuxOnline, telaAux
var escala = '072022'
var legendasEscala = '"-","A1 - SO R1 EDUARDO","A4 - 2S LIVIA","A5 - 1S LIDIANE","A6 - 3S COUTINHO",' +
    '"A5 - 1S LIDIANE",' + '"A2 - SO LOBO",' + '"J4 - 1S RENAN",' + '"A3 - 2S MEIRELES",' + '"F1 - SO NERY",' + '"C2 - 1S PORTUGAL",' + '"B5 - 3S MAYARA",' + '"I3 - 3S FABIANO",' + '"J1 - SO R1 AURELIO",' +
    '"F4 - SO CUSTODIO",' + '"D5 - 1S LEONARDO",' + '"B1 - 2S CARLA GUTTEMBERG",' + '"C1 - 2S CINTRA",' + '"A4 - 2S LIVIA",' + '"I4 - 3S MARINS",' + '"J2 - 3S BEATRIZ",' + '"J2 - 3S BEATRIZ"'

var tituloEscala = 'Escala Prevista CMI'
var urlLegendas = '../php/getLegendas.php'
var urlAfastamentos = '../php/getAfastamentos.php'
var arrayLegendas = []
var arrayHorasTrab = []
var turnoColOffSet = 2
var arrayRISAER = []
let cargaHorariaTotal = 0
let globalL, globalC, disableTelaAux = false
let globalSelectedLegenda, globalBorderControl = []


var linhaInicioLegendas = 5
var turnosEscala = [
    /* TURNOS PREVISORES*/
    /*
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'PREV AD', dias: [] }]},
    { legenda: '2 TURNO_0700P/1900P', primeiro: false, horas: 12, pernoite: true, posicoesOP: [{ titulo: 'PREV AD', dias: [] }]},
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'PREV ÁREA', dias: [] }]},
    { legenda: '2 TURNO_0700P/1900P', primeiro: false, horas: 12, pernoite: true, posicoesOP: [{ titulo: 'PREV ÁREA', dias: [] }]},
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'PREV VIG', dias: [] }]},
    { legenda: '2 TURNO_0700P/1900P', primeiro: false, horas: 12, pernoite: true, posicoesOP: [{ titulo: 'PREV VIG', dias: [] }]},
    { legenda: '1 TURNO_0700P/0700P', primeiro: true, horas: 24, pernoite: true, posicoesOP: [{ titulo: 'PREV CGNA', dias: [] }]}
    */

    /* TURNOS AUXILIARES*/
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }/*, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }*/, { titulo: 'SUP', dias: [] }] },
    { legenda: '2 TURNO_1900P/0000P', primeiro: false, horas: 12, pernoite: true, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }/*, { titulo: 'OPR_VOLMET', dias: [] }*/] }

    //{ legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }] }
    //{ legenda: '3 TURNO_0000P/0700P', primeiro: false, pernoite: true, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }] }
    //{ legenda: '2 TURNO_1900P/0700P', primeiro:false, pernoite: true, posicoesOP: ['AUX_BRIEF', 'AUX_BRIEF', 'AUX_VIG_ROTA', 'AUX_VIG_ROTA', 'AUX_VIG AD', 'AUX_VIG AD', 'OPR_VOLMET', 'OPR_VOLMET', 'SUP']}

]

var dias = []
var totalCols = getTotalCols()
var arrayIndisponibilidadesDia = [] //pernoites
var arrayAfastamentos = []

function getTotalHorasDisponiveis(arrayLegendas) {
    let cont = 0
    let diasMes = getDaysInCurrentMonth(escala)
    let diasDisp = 0

    for (let i in arrayLegendas) {
        cont++
        if (arrayLegendas[i].diasAfastamento)
            diasDisp += diasMes - [... new Set(arrayLegendas[i].diasAfastamento)].length
        else
            diasDisp += diasMes
    }
    return diasDisp * 24
}

function sortNumber(arr, unique = false) {

    arr.sort(function (a, b) {
        if (parseInt(a) > parseInt(b)) {
            return 1;
        }
        if (parseInt(a) < parseInt(b)) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    if (unique)
        return [... new Set(arr)]
    else
        return arr

}


function limpaLegendas(legendasEscala) {
    let leg = legendasEscala.replaceAll('"', '').split(',')
    let r = []

    arrayLegendas = []
    arrayHorasTrab = []
    for (let i in leg) {
        let l = leg[i].split(' - ')[0]
        r.push(l.replaceAll())
        arrayLegendas[l] = { legenda: l, percentualCargaTrab: 0, horasTrab: 0, diasAfastamento: [], diasTrab: [], diasFolga: [], diasDeFolga: [], diasDeRisaer: [], diasPernoite: [] };
        arrayHorasTrab[l] = 0

    }

    //return '"' + r.join('","') + '"'
    return '"' + r.join('","') + '"'

}

function sortByHour(arrAux) {
    let items = []
    for (let i in arrAux) {
        items.push({ legenda: i, horasTrab: arrAux[i].horasTrab })

    }

    items.sort(function (a, b) {
        if (parseInt(a.horasTrab) > parseInt(b.horasTrab)) {
            return 1;
        }
        if (parseInt(a.horasTrab) < parseInt(b.horasTrab)) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    return items
}

function filtraCargaMinima(arrAux) {
    let items = []
    for (let i in arrAux) {
        if (arrAux[i].legenda !== '-' && arrAux[i].cargaMaxima > 0)
            items.push(arrAux[i])
    }

    return items
}

function sortByCargaTrabMin(arrAux, inverte = 1) {
    let items = []
    for (let i in arrAux) {
        if (arrAux[i].legenda !== '-')
            items.push(arrAux[i])
    }

    items.sort(function (a, b) {
        if (parseFloat(a.cargaTrabMin) > parseFloat(b.cargaTrabMin)) {
            return 1 * inverte;
        }
        if (parseFloat(a.cargaTrabMin) < parseFloat(b.cargaTrabMin)) {
            return -1 * inverte;
        }
        // a must be equal to b
        return 0;
    });

    return items
}

function sortByMenosFolgado(arrAux, dia) {
    let items = []
    for (let i in arrAux) {
        if (arrAux[i].legenda !== '-')
            items.push(arrAux[i])
    }
    if (dia > 1) {
        dia--
        items.sort(function (a, b) {
            let diaAntA = parseInt(a.diasDeFolga[dia])
            let diaAntB = parseInt(b.diasDeFolga[dia])
            if (diaAntA > diaAntB) {
                return 1;
            }
            if (diaAntA < diaAntB) {
                return -1;
            }

            return 0;
        });
    }

    return items
}

function sortByCargaTrab(arrAux, inverte = 1) {
    let items = []
    for (let i in arrAux) {
        if (arrAux[i].legenda !== '-')
            items.push(arrAux[i])
    }

    items.sort(function (a, b) {
        if (parseFloat(a.percentualCargaTrab) > parseFloat(b.percentualCargaTrab)) {
            return 1 * inverte;
        }
        if (parseFloat(a.percentualCargaTrab) < parseFloat(b.percentualCargaTrab)) {
            return -1 * inverte;
        }
        // a must be equal to b
        return 0;
    });

    return items
}

function sortByCargaMax(arrAux, inverte = 1) {
    let items = []
    for (let i in arrAux) {
        if (arrAux[i].legenda !== '-')
            items.push(arrAux[i])
    }

    items.sort(function (a, b) {
        if (parseFloat(a.cargaMaximaEmHoras) > parseFloat(b.cargaMaximaEmHoras)) {
            return 1 * inverte;
        }
        if (parseFloat(a.cargaMaximaEmHoras) < parseFloat(b.cargaMaximaEmHoras)) {
            return -1 * inverte;
        }
        // a must be equal to b
        return 0;
    });

    return items
}

function getLegendas(url) {
    fetch(url).then(function (response) {
        //console.log( response.json())
        return response.json();
    }).then(function (data) {
        var s = '"-","'
        let sep = ''
        for (b in data) {
            s += sep + data[b]
            sep = '","'
        }
        s += '"'
        legendasEscala = limpaLegendas(s)
        getAfastamentos(urlAfastamentos);
        //return s;

        //console.log(data);
    }).catch(function () {
        console.log("Erro ao tentar obter as Legendas da Escala!");
    });
}

function updateArrayRISAER(legenda, dia) {
    //    if (arrayLegendas[legenda] && !arrayLegendas[legenda].diasDeRisaer.includes(dia))
    //        arrayLegendas[legenda].diasDeRisaer.push(dia)
    if (!arrayRISAER[legenda])
        arrayRISAER[legenda] = []
    if (!arrayRISAER[legenda].includes(dia))
        arrayRISAER[legenda].push(dia)
}

function updateArrayAfastamentos(data) { //afastamentos escala
    arrayAfastamentos = []
    for (b in data) {
        let dado = data[b]
        let legenda = b.split("-")[1]

        let arrDado = dado.split(',')
        let inicio = new Date(arrDado[0])
        if (arrDado[1].includes('RISAER')) {
            arrDado[1] = arrDado[1].replace('RISAER', '')
            updateArrayRISAER(legenda, new Date(inicio).getDate());
        }

        let fim = new Date(arrDado[1])


        arrayAfastamentos.push({ legenda, inicio, fim, carga: parseFloat(arrDado[2]) })

    }

}

function getAfastamentos(url) { //afastamentos escala
    fetch(url).then(function (response) {
        //console.log( response.json())
        return response.json();
    }).then(function (data) {
        // legendasEscala = limpaLegendas(s)
        updateArrayAfastamentos(data)
        updateDiasAfastamentosLegenda()

        start();

        //console.log(data);
    }).catch(function () {
        console.log("Erro ao tentar obter os Afastamentos da Escala!");
    });
}

function inicializaGradeEscala() {
    $('#demo').ip_Grid({ rows: 38, cols: 39 });

}

function getTotalCols() {
    let total = 0
    for (let i in turnosEscala) {
        total += turnosEscala[i].posicoesOP.length
    }
    return total + 2 + turnosEscala.length - 1

}

function atualizaIndisponibilidades() { //pernoite
    arrayIndisponibilidadesDia = []

    for (let i in turnosEscala) {
        if (turnosEscala[i].pernoite) {
            for (let j in turnosEscala[i].posicoesOP) {
                for (let k in turnosEscala[i].posicoesOP[j].dias) {
                    k = parseInt(k)
                    if (!arrayIndisponibilidadesDia[k + 1])
                        arrayIndisponibilidadesDia[k + 1] = []
                    if (!arrayIndisponibilidadesDia[k + 1].includes(turnosEscala[i].posicoesOP[j].dias[k]))
                        arrayIndisponibilidadesDia[k + 1].push(turnosEscala[i].posicoesOP[j].dias[k])
                }
            }
        }
    }
}

function updateDias(l, c) {

    if (!l) {
        l = globalL
        c = globalC
    }

    let valor = $('#demo').ip_CellData(l, c).display;

    if (l < linhaInicioLegendas || legendasEscala.indexOf(valor) < 0)
        return false

    let dia = getDiaLinha(l)
    let col = c

    cont = 2
    let i = 0
    while (i < turnosEscala.length) {
        let j = 0
        while (j < turnosEscala[i].posicoesOP.length) {
            if (cont == col) {
                //if (turnosEscala[i].posicoesOP[j].dias[dia])
                turnosEscala[i].posicoesOP[j].dias[dia] = valor

                return true
            }
            cont++
            j++
        }
        i++
        cont++ // pula coluna entre os turnos  
    }

    if (!dias[l])
        dias[l] = []
    //if (!dias[lin][col])



    //dias[lin - linhaInicioLegendas + 1].legenda = $('#demo').ip_CellData(lin,col).display;
}

function getDia(lin, col) {

}

function getPosicoesDia(comEspaco = false) {
    let total = 0
    for (let i in turnosEscala) {
        total += turnosEscala[i].posicoesOP.length
        if (comEspaco)
            total++
    }
    if (comEspaco)
        total--
    return total
}

function formataCabecalhoTurnos(turnosEscala) {
    let dias = getDaysInCurrentMonth(escala)
    let maxCol = 0
    let xTurnoColOffset = turnoColOffSet
    for (let ix in turnosEscala) {
        let i = parseInt(ix)
        let turno = turnosEscala[i]
        let colIni = xTurnoColOffset
        numPosicoes = turno.posicoesOP.length
        $('#jqs').ip_MergeRange({ range: [{ startRow: 0, startCol: colIni, endRow: 0, endCol: colIni + numPosicoes - 1 }] })
        $('#jqs').ip_MergeRange({ range: [{ startRow: 1, startCol: colIni, endRow: 1, endCol: colIni + numPosicoes - 1 }] })

        $('#jqs').ip_CellInput({ valueRAW: turno.legenda.split('_')[0], range: [{ startRow: 0, startCol: colIni, endRow: 0, endCol: colIni }] })
        $('#jqs').ip_CellInput({ valueRAW: turno.legenda.split('_')[1], range: [{ startRow: 1, startCol: colIni, endRow: 1, endCol: colIni }] })

        for (let jx in turno.posicoesOP) {
            let j = parseInt(jx)
            let posicao = turno.posicoesOP[j].titulo
            let legendas = posicao.split('_')
            for (let col in legendas) {
                let c = parseInt(col)
                if (colIni + j > maxCol)
                    maxCol = colIni + j
                $('#jqs').ip_CellInput({ valueRAW: legendas[c], range: [{ startRow: 2 + c, startCol: colIni + j, endRow: 2 + c, endCol: colIni + j }] })

                /*$('#jqs').ip_FormatCell({
                    controlType: 'dropdown', validation: { validationCriteria: '=dropdown(' + legendasEscala + ')', validationAction: '' },
                    range: [{ startRow: 5, startCol: colIni + j, endRow: dias + 4, endCol: colIni + j }]
                })*/

            }

        }
        xTurnoColOffset = maxCol + 2
    }
}

function atualizaTitulo(titulo) {
    $('#h1Titulo').html(`${titulo}: ${escala.substr(0, 2)}/${escala.substr(2, 4)}`)

}

function getMesEscala(escala) {
    return escala.slice(0, 2)
}

function getAnoEscala(escala) {
    return escala.slice(2, 6)
}

function getDaysInCurrentMonth(escala) {
    let mesAno = escala
    if (!mesAno) {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    }
    else {
        let mes = getMesEscala(mesAno)
        let ano = getAnoEscala(mesAno)
        return new Date(parseInt(ano), parseInt(mes), 0).getDate();
    }
}

function fillDaysWeek(escala, obj) {
    let mes = getMesEscala(escala)
    let ano = getAnoEscala(escala)
    let week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

    let dias = getDaysInCurrentMonth(escala)
    let inicio = new Date(ano, mes - 1, 1).getDay()
    for (let i = 0; i < dias; i++) {
        let day = (week[(i + inicio) % 7])
        obj.ip_CellInput({ valueRAW: day, range: [{ startRow: i + linhaInicioLegendas, startCol: 1, endRow: i + linhaInicioLegendas, endCol: 1 }] })
        if (day == 'SAB' || day == 'DOM') {
            obj.ip_FormatCell({ style: 'background-color:#555;', range: [{ startRow: i + linhaInicioLegendas, startCol: 1, endRow: i + linhaInicioLegendas, endCol: 1 }] })
            obj.ip_FormatCell({ style: 'color:white;', range: [{ startRow: i + linhaInicioLegendas, startCol: 1, endRow: i + linhaInicioLegendas, endCol: 1 }] })
        }


    }


}

function fillDaysMonth(escala, obj) {

    let dias = getDaysInCurrentMonth(escala)
    for (let i = 0; i < dias; i++) {
        obj.ip_CellInput({ valueRAW: (i + 1) + '', range: [{ startRow: i + linhaInicioLegendas, startCol: 0, endRow: i + linhaInicioLegendas, endCol: 0 }] })
    }
}

/*function formataCelulasComLegenda(escala, turnosEscala) {
    let dias = getDaysInCurrentMonth(escala)

    $('#jqs').ip_FormatCell({

        controlType: 'dropdown', validation: { validationCriteria: '=dropdown(' + legendasEscala + ')', validationAction: '' },
        range: [{ startRow: 5, startCol: 2, endRow: dias + 4, endCol: 11 }]
    })
}*/

function getYearEscala(escala) {
    return parseInt(escala.substr(2, 4))

}

function getMonthEscala(escala) {
    return parseInt(escala.substr(0, 2))
}

function filtraAfastamentos(dia) {
    let data = new Date(getYearEscala(escala), getMonthEscala(escala) - 1, dia)
    let arrayAfastamentosDia = []

    for (let i in arrayAfastamentos) {

        if (data >= new Date(arrayAfastamentos[i].inicio) && data <= new Date(arrayAfastamentos[i].fim))
            arrayAfastamentosDia.push(arrayAfastamentos[i].legenda)


    }

    let arrL = legendasEscala.replaceAll('"', '').split(',')

    let filtrados = arrL.filter(x => !arrayAfastamentosDia.includes(x));

    return '"' + filtrados.join('","') + '"'
}

/*
Cria a lista dropdown para cada linha, excluindo as legendas afastadas em cada dia
*/
function updateCells(escala) {
    let linha = linhaInicioLegendas
    let dia = 1
    let colIni = turnoColOffSet
    let diasMes = getDaysInCurrentMonth(escala)

    for (let dia = 1; dia <= diasMes; dia++) {
        let legendasDia = '=dropdown(' + filtraAfastamentos(dia) + ')'
        let colIni = turnoColOffSet

        for (let i in turnosEscala) {
            let colFim = colIni + turnosEscala[i].posicoesOP.length - 1
            //let legenda = $('#demo').ip_CellData(linha, i).display.replace("-", "")
            $('#jqs').ip_FormatCell({
                controlType: 'dropdown', validation: { validationCriteria: legendasDia, validationAction: '' },
                range: [{ startRow: linha + dia - 1, startCol: colIni, endRow: linha + dia - 1, endCol: colFim }]
            })

            colIni += turnosEscala[i].posicoesOP.length + 1 // mais 1 é o espaco entre os turnos

        }

    }
}

function updateCargaHoraria() {
    let horasEscalaDia = 0
    let diasMes = getDaysInCurrentMonth(escala)
    let minH = 24
    for (let i in turnosEscala) {
        if (turnosEscala[i].horas < minH)
            minH = turnosEscala[i].horas
        horasEscalaDia += turnosEscala[i].horas * turnosEscala[i].posicoesOP.length
    }
    let totalHorasAfastamento = 0
    let totalLegendas = 0
    let totalHorasRisaer = 0
    let totalHoraExtra = 0
    for (let i in arrayLegendas) {
        if (i !== '-') {
            totalLegendas++
            let diasRisaer = 0
            if (arrayRISAER[i]) {
                diasRisaer = arrayRISAER[i].length

            }
            let horasRisaer = diasRisaer * 24
            totalHorasRisaer += horasRisaer
            if (!arrayLegendas[i].horasTrabExtra)
                arrayLegendas[i].horasTrabExtra = 0
            totalHoraExtra += (arrayLegendas[i].horasTrabExtra / 24) * horasEscalaDia
            totalHorasAfastamento += (arrayLegendas[i].diasAfastamento.length) * horasEscalaDia
        }
    }

    //cargaHorariaTotalAfastam = (totalLegendas * diasMes * horasEscalaDia) //pra quem tem afastamentos a proporcao de trabalho não leverá em conta os afastamentos
    forcaHorariaTotal = (totalLegendas * diasMes * horasEscalaDia) - totalHorasAfastamento + totalHoraExtra // + totalCargaAfastamentos
    aux = 0
    for (let i in arrayLegendas) {
        if (i !== '-') {
            arrayLegendas[i].cargaMaxima = ((diasMes - arrayLegendas[i].diasAfastamento.length + (arrayLegendas[i].horasTrabExtra / 24)) * horasEscalaDia) / forcaHorariaTotal
            arrayLegendas[i].cargaMaximaEmHoras = arrayLegendas[i].cargaMaxima * (horasEscalaDia * diasMes)
            arrayLegendas[i].cargaMaximaHD = ((diasMes - arrayLegendas[i].diasAfastamento.length + (arrayLegendas[i].horasTrabExtra / 24)) * horasEscalaDia)
            arrayLegendas[i].cargaTrab = arrayLegendas[i].cargaMaxima > 0 ? arrayLegendas[i].horasTrab / arrayLegendas[i].cargaMaximaEmHoras : 0
            //            arrayLegendas[i].cargaTrabMin = minH / arrayLegendas[i].cargaMaxima
            arrayLegendas[i].percentualCargaTrab = Math.round((arrayLegendas[i].horasTrab / arrayLegendas[i].cargaMaximaEmHoras) * 100)

            aux += arrayLegendas[i].cargaMaxima
        }
    }
}

function updateDiasAfastamentosLegenda() {
    let mes = getMonthEscala(escala) - 1
    let ano = getYearEscala(escala)
    let inicioMes = new Date(ano, mes, 1)
    let diasMes = getDaysInCurrentMonth(escala)
    let fimMes = new Date(ano, mes, diasMes)

    for (let i in arrayAfastamentos) {
        let inicio = arrayAfastamentos[i].inicio
        let fim = arrayAfastamentos[i].fim
        if (fim < inicioMes || inicio > fimMes)
            continue;
        if (inicio < inicioMes)
            inicio = inicioMes
        if (fim > fimMes)
            fim = fimMes

        let dias
        if (inicio.toDateString() == fim.toDateString())
            dias = 1
        else
            dias = new Date(fim - inicio).getDate() + 1
        let arrayDias = [...Array(diasMes).keys()].map(i => i + 1).splice(inicio.getDate() - 1, dias);
        if (arrayLegendas[arrayAfastamentos[i].legenda]) {
            arrayLegendas[arrayAfastamentos[i].legenda].diasAfastamento = [...new Set(arrayLegendas[arrayAfastamentos[i].legenda].diasAfastamento.concat(arrayDias))].sort(function (a, b) { //set remove repetidos
                return a - b; //ordena numeros
            });
            if (!arrayLegendas[arrayAfastamentos[i].legenda].horasTrabExtra)
                arrayLegendas[arrayAfastamentos[i].legenda].horasTrabExtra = 0
            arrayLegendas[arrayAfastamentos[i].legenda].horasTrab += arrayAfastamentos[i].carga
            if (arrayAfastamentos[i].carga > 0) {
                arrayLegendas[arrayAfastamentos[i].legenda].horasTrabExtra += arrayAfastamentos[i].carga
            }
        }
    }
}

function checkAfastamentos(legenda, dia, escala) {
    let mes = getMonthEscala(escala) - 1
    let ano = getYearEscala(escala)
    let data = new Date(ano, mes, dia)

    for (let i in arrayAfastamentos) {
        if (arrayAfastamentos[i].legenda == legenda && data >= arrayAfastamentos[i].inicio && data <= arrayAfastamentos[i].fim) {
            return false
        }
    }
    return true
}

function getDiaLinha(linha) {
    return linha - linhaInicioLegendas + 1
}

function verificaLinha(linha, coluna, OnlyCheck = false) {
    let dia = getDiaLinha(linha)
    let ok

    if (linha < linhaInicioLegendas)
        return false

    //verifica se 
    for (let i = 2; i < totalCols; i++) {
        ok = true
        if (!OnlyCheck) { //retira os vermelhos das celulas
            $('#demo').ip_FormatCell({ style: 'color:black;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
            $('#demo').ip_FormatCell({ style: 'background-color:white;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
        }

        //verifica Afastamentos da Tabela 
        let legenda = $('#demo').ip_CellData(linha, i).display.replace("-", "")
        if (!checkAfastamentos(legenda, dia, escala)) {
            ok = false
        }

        //verifica indisponibilidades do pernoite
        let dado = $('#demo').ip_CellData(linha, i).display
        if (arrayIndisponibilidadesDia[dia] && dado !== "" && arrayIndisponibilidadesDia[dia].includes(dado)) {
            ok = false
        }

        //verifica RISAER
        if (checkRISAER(dado, dia - 1)) //falta verificar o risaer do dia seguinte ao pernoite
            ok = false

        if (checkRISAER(dado, dia + 1) && checkPernoite(dado, dia)) //falta verificar o risaer do dia seguinte ao pernoites
            ok = false


        if (!ok && !OnlyCheck)
            $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
    }

    //verifica se já está de svc no mesmo dia
    for (let i = 2; i < totalCols - 1; i++) {
        for (let j = i + 1; j < totalCols; j++) {
            let c1 = $('#demo').ip_CellData(linha, i).display.replace("-", "")
            let c2 = $('#demo').ip_CellData(linha, j).display.replace("-", "")
            if ((c1 !== "") && (c2 !== "") && (c1 == c2)) {
                //alert('duplicado')
                if (!OnlyCheck) {
                    $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
                    $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: j, endRow: linha, endCol: j }] })
                }

            }
        }
    }
}

/*function verificaIndisponibilidades(lin, col) {
    dia = lin - linhaInicioLegendas + 1
    if (arrayIndisponibilidadesDia[dia].includes($('#demo').ip_CellData(lin, col).display)) {
        $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })
        //$('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: j, endRow: linha, endCol: j }] })
    }
    for (let i in arrayIndisponibilidadesDia) {
 
    }
}
function filtraMenosFolgado(dia, array) {
    let aux = []
    for (let i in array) {
        if (array[i].diasTrab.indexOf(dia - 1) > -1) // se trabalhando no dia anterior
            aux.push(array[i])

    }

    return aux
}*/

function getEscaladosDia(dia, array = arrayLegendas) {
    let aux = []
    for (let i in array) {
        if (array[i].diasTrab.indexOf(dia) > -1)
            aux.push(array[i])

    }

    return aux

}

function getDiasDisp(legenda, diasMes) {
    let arrayDias = [...Array(diasMes).keys()].map(i => i + 1)

    let arrDiasDisp = arrayDias.filter(x => !arrayLegendas[legenda].diasAfastamento.includes(x));
    return sortNumber(arrDiasDisp)
}

function getDiasFolga(legenda, diasMes) {
    let arrDiasDisp = getDiasDisp(legenda, diasMes)

    let arrDiasFolga = arrDiasDisp.filter(x => !arrayLegendas[legenda].diasTrab.includes(x));

    return sortNumber(arrDiasFolga)

}

function checkPernoite(legenda, dia) {
    diasMes = getDaysInCurrentMonth(escala)
    if (dia < 1 || dia > diasMes)
        return false

    for (let i in turnosEscala) {
        if (turnosEscala[i].pernoite) {
            for (let j in turnosEscala[i].posicoesOP) {
                if (turnosEscala[i].posicoesOP[j].dias[dia] == legenda)
                    return true
            }
        }
    }
    return false
}
/*
function checkPernoite(legenda, dia) {
    if (dia < 1)
        return false
    if (arrayLegendas[legenda] && arrayLegendas[legenda].diasPernoite.indexOf(dia) > -1)
        return true
}
*/
function updateArrayFolgas() {
    //
    let diasMes = getDaysInCurrentMonth(escala)
    let l, c

    for (let i in arrayLegendas) {
        let leg = arrayLegendas[i]
        if (leg.legenda == "A2")
            console.log("ok")
        leg.diasFolga = getDiasFolga(i, diasMes)
        let contador = 0
        let anterior = 0
        leg.diasDeFolga = [...Array(diasMes).keys()].map(i => 0)
        for (let j in leg.diasFolga) {
            let dia = leg.diasFolga[j]
            if (dia - anterior > 1) {
                contador = 0
                if (checkPernoite(leg.legenda, dia - 1) || checkRISAER(leg.legenda, dia - 1))
                    contador--
            }
            anterior = dia
            leg.diasDeFolga[dia] = contador
            contador++
        }
    }


    /*    for (let dia = 1; dia <= diasMes; dia++) {
    
            let colIni = turnoColOffSet
            let colAtual = colIni
            l = dia + linhaInicioLegendas - 1
            for (let i in turnosEscala) {
                i = parseInt(i)
                for (let j in turnosEscala[i].posicoesOP) {
                    c = colAtual
                    globalC = c //auxiliar ao evento input
                    globalL = l
                    $('#jqs').ip_CellInput({ valueRAW: "", range: [{ startRow: l, startCol: c, endRow: l, endCol: c }] })
    
                    colAtual++
                }
                colAtual++
            }
            verificaLinha(l, 0, false)
        }*/
}

function limpaTurnosEscala() {
    //
    let diasMes = getDaysInCurrentMonth(escala)
    let l, c
    for (let dia = 1; dia <= diasMes; dia++) {

        let colIni = turnoColOffSet
        let colAtual = colIni
        l = dia + linhaInicioLegendas - 1
        for (let i in turnosEscala) {
            i = parseInt(i)
            for (let j in turnosEscala[i].posicoesOP) {
                c = colAtual
                globalC = c //auxiliar ao evento input
                globalL = l
                $('#jqs').ip_CellInput({ valueRAW: "", range: [{ startRow: l, startCol: c, endRow: l, endCol: c }] })

                colAtual++
            }
            colAtual++
        }
        verificaLinha(l, 0, false)
    }
}

function selectAllLeg(leg, moveToStart = false) {
    //
    let linha = linhaInicioLegendas
    let dia = 1
    let colIni = turnoColOffSet
    let diasMes = getDaysInCurrentMonth(escala)
    let l, c
    let totalSvcs = 0

    if (moveToStart)
        $('#demo').ip_SelectCell({ row: 0, col: 0 })
    for (let dia = 1; dia <= diasMes; dia++) {

        let colIni = turnoColOffSet
        let colAtual = colIni
        l = dia + linhaInicioLegendas - 1
        for (let i in turnosEscala) {
            i = parseInt(i)
            for (let j in turnosEscala[i].posicoesOP) {
                c = colAtual
                if ($('#demo').ip_CellData(l, c).display == leg) {
                    //$('#demo').ip_SelectRange({ range: { startRow: l, startCol: c, endRow: l, endCol: c }, multiselect: true })
                    $('#demo').ip_FormatCell({ style: 'border-color:black; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid;', range: [{ startRow: l, startCol: c, endRow: l, endCol: c }] })
                    globalBorderControl.push([l, c])


                    totalSvcs++
                }
                colAtual++

            }
            colAtual++
        }
        //colorir as indisponibilidades
        if (arrayLegendas[leg])
            if (arrayLegendas[leg].diasAfastamento.indexOf(dia) < 0) {
                //$('#demo').ip_FormatCell({ style: 'background-color:white;', range: [{ startRow: l, startCol: 0, endRow: l, endCol: 0 }] })
                //$('#demo').ip_FormatCell({ style: 'color:black;', range: [{ startRow: l, startCol: 0, endRow: l, endCol: 0 }] })
            }
            else {
                $('#demo').ip_FormatCell({ style: 'background-color:red;', range: [{ startRow: l, startCol: 0, endRow: l, endCol: 0 }] })
                $('#demo').ip_FormatCell({ style: 'color:white;', range: [{ startRow: l, startCol: 0, endRow: l, endCol: 0 }] })
            }

    }
    //
    console.log(totalSvcs)

}

function clearBorders() {
    for (let i in globalBorderControl) {
        let l = globalBorderControl[i][0]
        let c = globalBorderControl[i][1]
        $('#demo').ip_FormatCell({ style: 'border-color:#eee; border-width: 1px 1px 1px 1px;', range: [{ startRow: l, startCol: c, endRow: l, endCol: c }] })
    }
    globalBorderControl = []
}

function inicializaEventoClick() {
    function clearColorDays() {
        let li = linhaInicioLegendas
        let lf = li + getDaysInCurrentMonth()
        let c = 0

        $('#demo').ip_FormatCell({ style: 'background-color:white;', range: [{ startRow: li, startCol: c, endRow: lf, endCol: c }] })
        $('#demo').ip_FormatCell({ style: 'color:black;', range: [{ startRow: li, startCol: c, endRow: lf, endCol: c }] })
    }

    function selectDay(linha) {
        let li = lf = linha
        let c = 0
        $('#demo').ip_FormatCell({ style: 'background-color:#555;', range: [{ startRow: li, startCol: c, endRow: lf, endCol: c }] })
        $('#demo').ip_FormatCell({ style: 'color:white;', range: [{ startRow: li, startCol: c, endRow: lf, endCol: c }] })
    }

    $('#demo').on('click', function (arg) {
        /*let oldData = $('#demo').ip_CellData(0, 0).display
        $('#demo').ip_Copy();
        $('#demo').ip_Paste({row:0,col:0});
        globalSelectedLegenda = $('#demo').ip_CellData(0, 0).display
 
        $('#jqs').ip_CellInput({ valueRAW: oldData, range: [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }] })
 
        */

        globalSelectedLegenda = arg.target.innerText
        ip_GridProps['demo'].selectedCell.row

        clearColorDays()

        clearBorders(globalBorderControl)

        selectDay(ip_GridProps['demo'].selectedCell.row)

        if (arg.target.innerText == "")
            return false

        let dia = $('#demo').ip_CellData(ip_GridProps['demo'].selectedCell.row, 0).display

        telaAux.selectFolgados(dia)

        selectAllLeg(globalSelectedLegenda)

    })

}
function inicializaEventoInput() {
    function cellChanged(event, args) {
        let lin = args.options.SetCellValue.Inputs.row
        let col = args.options.SetCellValue.Inputs.col

        updateDias(lin, col)
        verificaLinha(lin, col)

        //verificaIndisponibilidades(lin, col)
        atualizaIndisponibilidades()
        verificaLinha(lin + 1, col)


        updateHorasTrab()
        updateCargaHoraria()
        //updatePernoites()

        //
        if (telaAux && !disableTelaAux)
            telaAux.fillLegendas();
    }
    //inserir tratamento para colagem de celulas


    $('#demo').on('ip_CellInput', cellChanged)
    //alert('mudou'))
    //$('#demo').on('ip_RowSelector', function (event, args) { alert('row selector') })
    //$('#demo').on('ip_SetCellValues', alert('mudou'))

}

function updateHorasTrab() {
    limpaLegendas(legendasEscala)
    updateDiasAfastamentosLegenda()
    for (let i in turnosEscala) {
        for (let j in turnosEscala[i].posicoesOP) {
            let horas = turnosEscala[i].horas
            for (let k in turnosEscala[i].posicoesOP[j].dias) {
                k = parseInt(k)
                let leg = turnosEscala[i].posicoesOP[j].dias[k]
                if (arrayLegendas[leg]) {
                    arrayLegendas[leg].horasTrab = arrayLegendas[leg].horasTrab + horas
                    if (!arrayLegendas[leg].diasTrab)
                        arrayLegendas[leg].diasTrab = []
                    if (!arrayLegendas[leg].diasPernoite)
                        arrayLegendas[leg].diasPernoite = []

                    /*arrayLegendas[leg].diasTrabPernoite.push(k)
                    arrayLegendas[leg].diasTrabPernoite = sortNumber(arrayLegendas[leg].diasTrabPernoite)*/
                    if (turnosEscala[i].pernoite)
                        arrayLegendas[leg].diasPernoite.push(k)
                    arrayLegendas[leg].diasTrab.push(k)
                    arrayLegendas[leg].diasTrab = sortNumber(arrayLegendas[leg].diasTrab)
                    arrayHorasTrab[leg] = arrayLegendas[leg].horasTrab
                }
            }
        }
    }
    //soma horas RISAER
    /*for (let i in arrayRISAER) {
        if (arrayLegendas[i])
            arrayLegendas[i].horasTrab += 24 * arrayRISAER[i].length
    }*/
}
/*
function autoFill() {
    for (let i in turnosEscala) {
        for (let j in turnosEscala[i].posicoesOP) {
            let horas = turnosEscala[i].horas
            for (let k in turnosEscala[i].posicoesOP[j].dias) {
                k = parseInt(k)
                let leg = turnosEscala[i].posicoesOP[j].dias[k]
                //if (arrayLegendas[leg])
                //  arrayLegendas[leg].horasTrab = arrayLegendas[leg].horasTrab + horas
            }
        }
    }
}
*/
function checkRISAER(legenda, dia) {
    let diasMes = getDaysInCurrentMonth(escala)
    if (dia < 1 || dia > diasMes)
        return false
    return (arrayRISAER[legenda] && arrayRISAER[legenda].indexOf(dia) > -1)
}

function montaEscala(tipo = 'legenda', forcaTroca = false) {
    function checkCargaHoraria(objLeg, horas) {
        //return objLeg.cargaMaxima > 0 ? ((objLeg.horasTrab + horas) / objLeg.cargaMaxima) <= objLeg.cargaMaximaHD : false
        return objLeg.cargaMaxima > 0 ? objLeg.percentualCargaTrab < 100 : false
    }
    function getEscalado(arrLeg, dia, horas) {
        let maiorCargaFolga = { legenda: '', carga: 0 }
        for (let i in arrLeg) {
            if (arrLeg[i].diasAfastamento.indexOf(dia) < 0 && arrLeg[i].diasTrab.indexOf(dia) < 0 && (!arrayIndisponibilidadesDia[dia] || (arrayIndisponibilidadesDia[dia].indexOf(arrLeg[i].legenda) < 0)) && (checkCargaHoraria(arrLeg[i], horas))) {
                //if (checkCargaHoraria(arrLeg[i], horas))
                return arrLeg[i].legenda
                /*               else {
                                   let cargaFolga = arrLeg[i].cargaMaximaHD - arrLeg[i].cargaTrab / arrLeg[i].cargaMaximaHD
                                   if (cargaFolga > maiorCargaFolga.carga) {
                                       maiorCargaFolga.legenda = arrLeg[i].legenda
                                       maiorCargaFolga.carga = cargaFolga
                                   }
               
 
            }*/
            }
        }

        return maiorCargaFolga.legenda //se todos forem estourar a carga máxima, pega o que estiver com a maior folga horária relativa
    }
    function getColLegenda(legenda, dia) {
        let col = 0
        for (let i in turnosEscala) {
            for (let j in turnosEscala[i].posicoesOP) {
                if (turnosEscala[i].posicoesOP[j].dias[dia] == legenda)
                    return col
                col++
            }
            col++ // espaco entre turnos
        }
        return -1
    }

    function montaPordia() {
        let arrSvcs = []

        arrSvcs = filtraCargaMinima(arrayLegendas)
        arrSvcs = sortByCargaTrab(arrSvcs) //remove o traço
        arrSvcs = sortByCargaMax(arrSvcs)
        let totalEscalados = 0
        for (let dia = 1; dia <= diasMes; dia++) {
            let colIni = turnoColOffSet

            let colAtual = colIni
            for (let i in turnosEscala) {

                i = parseInt(i)
                for (let c in turnosEscala[i].posicoesOP) {
                    //let svc = turnosEscala[i].posicoesOP[c]
                    //if (arrSvcs[0].legenda !=='-')
                    globalL = dia + linhaInicioLegendas - 1
                    globalC = colAtual
                    if ($('#demo').ip_CellData(globalL, globalC).display !== "")
                        continue
                    let escalado = getEscalado(arrSvcs, dia, turnosEscala[i].horas)
                    $('#jqs').ip_CellInput({ valueRAW: escalado, range: [{ startRow: globalL, startCol: colAtual, endRow: globalL, endCol: colAtual }] })
                    $('#demo').ip_FormatCell({ style: 'border-color:transparent; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid;', range: [{ startRow: globalL, startCol: colAtual, endRow: globalL, endCol: colAtual }] })

                    totalEscalados++
                    updateHorasTrab()
                    updateCargaHoraria()
                    verificaLinha(globalL, 0, false)
                    arrSvcs = filtraCargaMinima(arrayLegendas)
                    arrSvcs = sortByCargaTrab(arrSvcs)
                    arrSvcs = sortByCargaMax(arrSvcs)

                    colAtual++

                }
                colAtual++  // mais 1 é o espaco entre os turnos

            }
            //colIni++ //especo entre

        }
        return totalEscalados
    }

    function montaPorLegenda(forcaTroca = false) {
        function formataDias(arrayDias, carga) {
            return arrayDias
        }
        function getDiaFolgaMedia(arrDiasDeFolga, mediaFolgas) {//retorna o dia que começa a folga media
            //let minIdx = 0
            let maxFolga = -1

            for (let i in arrDiasDeFolga) {
                if (arrDiasDeFolga[i] >= mediaFolgas)
                    return parseInt(i)
                if (arrDiasDeFolga[i] > maxFolga)
                    maxFolga = arrDiasDeFolga[i]
            }
            return arrDiasDeFolga.indexOf(maxFolga) // se nenhuma folga for maior que a folga media prevista, retorna a maior folga
        }

        function getMediaFolgas(leg, arrDiasDisp) {
            let diasTrabMax24 = leg.cargaMaximaEmHoras / 24
            let diasTrabMax12 = leg.cargaMaximaEmHoras / 12

            let diasDispQuant = arrDiasDisp.length

            return Math.round((diasDispQuant - diasTrabMax12) / diasTrabMax24)

        }


        let arrLegs = []

        arrLegs = filtraCargaMinima(arrayLegendas) // remove operadores indiponiveis por todo o mês
        if (!forcaTroca) //se nao é troca, pega o que tem menos indisponibilidades
            arrLegs = sortByCargaMax(arrLegs, -1) // com -1 começa pelos que tëm menos indisponibilidades
        else
            arrLegs = sortByCargaTrab(arrLegs) // com -1 começa pelos que tëm menos indisponibilidades

        // arrLegs = sortByCargaTrab(arrayLegendas) // começa sempre pelos que tëm menos percentual trabalhado
        let posicoesDia = getPosicoesDia(true) // true = com espacos
        let totalEscalados = 0
        for (let leg in arrLegs) {
            let arrayDias = [...Array(diasMes).keys()].map(i => i + 1)
            let legenda = arrLegs[leg].legenda
            let arrDiasDisp = arrayDias.filter(x => !arrLegs[leg].diasAfastamento.includes(x));
            //arrDiasDisp = formataDias(arrayDias, Math.round(arrLegs[leg].cargaMaximaEmHoras / 12))
            let cargaFull = false

            let d

            //
            mediaFolgas = getMediaFolgas(arrLegs[leg], arrDiasDisp)

            if (!forcaTroca)//usado para balancear a carga horária com trocas
                d = 0 //começa do primeiro dia disponível/de folga
            else {
                d = arrDiasDisp.indexOf(getDiaFolgaMedia(arrayLegendas[legenda].diasDeFolga, mediaFolgas))
            }
            //let d = parseInt(Math.random() * arrDiasDisp.length)

            let carga24 = 0
            if (arrLegs[leg].cargaMaximaEmHoras == 0)
                continue
            let tentativas = 1
            let reverse = false //alterna o inicio das buscas pelo pernoite/manha
            let colAtual
            //if (legenda == "F3")
            //    console.log("oi")
            while (!cargaFull && tentativas < 3) {
                //for (let d in arrDiasDisp) {
                let dia = arrDiasDisp[d]
                let colIni = turnoColOffSet
                if (!reverse)
                    colAtual = colIni
                else
                    colAtual = turnoColOffSet + posicoesDia - 1

                //let cargaFull = false
                let proximoDia = false

                let legendasDoDia //estando aqui, a troca so eh feita dentro do turno correto
                let ordenadosPorCarga
                let menosFolgado
                let colSai
                if (forcaTroca) {
                    legendasDoDia = getEscaladosDia(dia)
                    ordenadosPorCarga = sortByCargaTrab(legendasDoDia, -1)
                    menosFolgado = ordenadosPorCarga[0].legenda
                    //menosFolgado = sortByMenosFolgado(ordenadosPorCarga, dia)[0].legenda
                    colSai = getColLegenda(menosFolgado, dia) + turnoColOffSet
                }

                let i = reverse ? turnosEscala.length - 1 : 0
                while (!reverse && i < turnosEscala.length || reverse && i >= 0) {

                    i = parseInt(i)

                    let legendaEntra = legenda
                    /*if (forcaTroca) 
                        legendaEntra = menosFolgado*/

                    if (turnosEscala[i].pernoite && dia < diasMes && arrayLegendas[legendaEntra].diasTrab.indexOf(dia + 1) > 0) // se escalado no dia posterior, pular o turno de pernoite
                        break
                    if (checkRISAER(legendaEntra, dia - 1) || (checkRISAER(legendaEntra, dia + 1) && turnosEscala[i].pernoite)) //evita conflitos RISAER
                        break

                    for (let c in turnosEscala[i].posicoesOP) {
                        globalL = dia + linhaInicioLegendas - 1
                        globalC = colAtual
                        if (!forcaTroca) { //preenche apenas células vazias
                            if ($('#demo').ip_CellData(2, globalC).display !== "" && $('#demo').ip_CellData(globalL, globalC).display == "" && (!arrayIndisponibilidadesDia[dia] || (arrayIndisponibilidadesDia[dia].indexOf(legenda) < 0)) && arrayLegendas[legenda].diasTrab.indexOf(dia) < 0) {
                                $('#jqs').ip_CellInput({ valueRAW: legenda, range: [{ startRow: globalL, startCol: colAtual, endRow: globalL, endCol: colAtual }] })
                                // $('#demo').ip_FormatCell({ style: 'border-color:#eee; border-width: 1px 1px 1px 1px;', range: [{ startRow: globalL, startCol: colAtual, endRow: globalL, endCol: colAtual}] })
                                totalEscalados++
                                updateHorasTrab()
                                updateCargaHoraria()
                                updateArrayFolgas()
                                verificaLinha(globalL, 0, false)
                                //arrLegs = filtraCargaMinima(arrayLegendas)
                                //arrLegs = sortByCargaTrab(arrLegs)
                                //arrLegs = sortByCargaMax(arrLegs)
                                carga24 += turnosEscala[i].horas
                                cargaFull = arrayLegendas[legenda].percentualCargaTrab > 100
                                proximoDia = true
                                reverse = !reverse
                                break;
                            }
                        } else if (colAtual == colSai && (!arrayIndisponibilidadesDia[dia] || (arrayIndisponibilidadesDia[dia].indexOf(legenda) < 0)) && arrayLegendas[legenda].diasTrab.indexOf(dia) < 0) { //se é uma troca forçada
                            globalC = colSai
                            console.log(`Trocou o ${menosFolgado} pelo ${legenda}, no dia ${dia} `)
                            $('#jqs').ip_CellInput({ valueRAW: legenda, range: [{ startRow: globalL, startCol: colSai, endRow: globalL, endCol: colSai }] }) //escala o mais folgado

                            totalEscalados++
                            updateHorasTrab()
                            updateCargaHoraria()
                            updateArrayFolgas()
                            verificaLinha(globalL, 0, false)
                            cargaFull = true;
                            break;

                        }
                        $('#demo').ip_FormatCell({ style: 'border-color:#eee; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid;', range: [{ startRow: globalL, startCol: colAtual, endRow: globalL, endCol: colAtual }] })

                        colAtual = reverse ? colAtual - 1 : colAtual + 1

                    }
                    //colAtual = reverse ? colAtual - 1 : colAtual + 1  // mais 1 é o espaco entre os turnos
                    if (cargaFull || proximoDia)
                        break
                    reverse ? i-- : i++
                }
                //colIni++ //especo entre

                if (cargaFull)
                    break
                if (carga24 >= 24) {
                    d += mediaFolgas
                    carga24 = 0
                }
                else
                    d++
                if (d >= arrDiasDisp.length) {
                    d = 0
                    carga24 = 0
                    tentativas++
                }
            }
            if (forcaTroca) //se ajuste da escala troca apenas a primeira legenda
                break;

        }
        return totalEscalados
    }
    disableTelaAux = true
    let diasMes = getDaysInCurrentMonth(escala)
    let totalQuadrinhos = getPosicoesDia() * diasMes

    let r
    if (tipo == 'dia')
        r = totalQuadrinhos - montaPordia()
    else
        r = totalQuadrinhos - montaPorLegenda(forcaTroca)
    disableTelaAux = false

    if (telaAux)
        setTimeout(telaAux.fillLegendas, 10);
    return r
}

function montaEscalaLoop() {
    tentativas = 0
    vazios = 1000
    while (vazios > 5) {
        tentativas++;
        limpaTurnosEscala()
        updateHorasTrab()
        updateCargaHoraria()
        vazios = montaEscala()
        console.log("tentativa: " + tentativas + '; vazios: ' + vazios)
    }
}

function start() {
    inicializaGradeEscala();

    atualizaTitulo(tituloEscala)

    fillDaysMonth(escala, $('#jqs'));

    fillDaysWeek(escala, $('#demo'));

    //formataCelulasComLegenda(escala);

    formataCabecalhoTurnos(turnosEscala)

    updateCells(escala);

    inicializaEventoInput();

    inicializaEventoClick();

    updateCargaHoraria();
}

$(document).ready(function () {
    getLegendas(urlLegendas)

});

function openTelaAux() {
    if (!telaAux || telaAux.closed) {
        telaAuxOnline = true
        telaAux = window.open("../tela-aux.html", 'ESCALA ' + escala, '')
        // smartPlot = window.open("../../smartplot8/index.html", 'SMART PLOT', 'menubar=no,status=no')
    }
    else
        telaAux.focus()
}
