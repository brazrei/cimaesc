//calcular horas afastamento
//calcular carga horária
//incluir risaer na carga horária
//ordenar operadores por carga horária
//preencher automaticamente a escala


var escala = '062022'
var legendasEscala = '"-","A1 - SO R1 EDUARDO","A4 - 2S LIVIA","A5 - 1S LIDIANE","A6 - 3S COUTINHO",' +
    '"A5 - 1S LIDIANE",' + '"A2 - SO LOBO",' + '"J4 - 1S RENAN",' + '"A3 - 2S MEIRELES",' + '"F1 - SO NERY",' + '"C2 - 1S PORTUGAL",' + '"B5 - 3S MAYARA",' + '"I3 - 3S FABIANO",' + '"J1 - SO R1 AURELIO",' +
    '"F4 - SO CUSTODIO",' + '"D5 - 1S LEONARDO",' + '"B1 - 2S CARLA GUTTEMBERG",' + '"C1 - 2S CINTRA",' + '"A4 - 2S LIVIA",' + '"I4 - 3S MARINS",' + '"J2 - 3S BEATRIZ",' + '"J2 - 3S BEATRIZ"'

var tituloEscala = 'Escala Prevista CMI'
var urlLegendas = 'php/getLegendas.php'
var urlAfastamentos = 'php/getAfastamentos.php'
var arrayLegendas = []
var arrayHorasTrab = []
var turnoColOffSet = 2

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
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, horas: 12, pernoite: false, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'SUP', dias: [] }] },
    { legenda: '2 TURNO_1900P/0000P', primeiro: false, horas: 12, pernoite: true, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'SUP', dias: [] }] }
    //{ legenda: '3 TURNO_0000P/0700P', primeiro: false, pernoite: true, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }] }
    //{ legenda: '2 TURNO_1900P/0700P', primeiro:false, pernoite: true, posicoesOP: ['AUX_BRIEF', 'AUX_BRIEF', 'AUX_VIG_ROTA', 'AUX_VIG_ROTA', 'AUX_VIG AD', 'AUX_VIG AD', 'OPR_VOLMET', 'OPR_VOLMET', 'SUP']}

]

var dias = []
var totalCols = getTotalCols()
var arrayIndisponibilidadesDia = [] //pernoites
var arrayAfastamentos = []


function limpaLegendas(legendasEscala) {
    let leg = legendasEscala.replaceAll('"', '').split(',')
    let r = []

    arrayLegendas = []
    arrayHorasTrab = []
    for (let i in leg) {
        let l = leg[i].split(' - ')[0]
        r.push(l.replaceAll())
        arrayLegendas[l] = { horasTrab: 0, diasAfastamento: [] };
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

function updateArrayAfastamentos(data) { //afastamentos escala
    arrayAfastamentos = []
    for (b in data) {
        let inicio = new Date(data[b].split(',')[0])
        let fim = new Date(data[b].split(',')[1])
        arrayAfastamentos.push({ legenda: b.split("-")[1], inicio, fim })
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
    function getTurno(col) {

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

    if (!dias[lin])
        dias[lin] = []
    //if (!dias[lin][col])



    //dias[lin - linhaInicioLegendas + 1].legenda = $('#demo').ip_CellData(lin,col).display;
}

function getDia(lin, col) {

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
    $('#h1Titulo').html(`${titulo}: ${escala}`)

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

function fillDaysWeek(escala) {
    let mes = getMesEscala(escala)
    let ano = getAnoEscala(escala)
    let week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

    let dias = getDaysInCurrentMonth(escala)
    let inicio = new Date(ano, mes - 1, 1).getDay()
    for (let i = 0; i < dias; i++) {
        $('#jqs').ip_CellInput({ valueRAW: (week[(i + inicio) % 7]), range: [{ startRow: i + linhaInicioLegendas, startCol: 1, endRow: i + linhaInicioLegendas, endCol: 1 }] })


    }


}

function fillDaysMonth(escala) {

    let dias = getDaysInCurrentMonth(escala)
    for (let i = 0; i < dias; i++) {
        $('#jqs').ip_CellInput({ valueRAW: (i + 1) + '', range: [{ startRow: i + linhaInicioLegendas, startCol: 0, endRow: i + linhaInicioLegendas, endCol: 0 }] })
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

function updateDiasAfastamentosLegenda() {
    let mes = getMonthEscala(escala) - 1
    let ano = getYearEscala(escala)
    let inicioMes = new Date(ano, mes, 1)
    let fimMes = new Date(ano, mes, getDaysInCurrentMonth(escala))

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
        let arrayDias = [...Array(31).keys()].map(i => i + 1).splice(inicio.getDate() - 1, dias);
        if (arrayLegendas[arrayAfastamentos[i].legenda])
            arrayLegendas[arrayAfastamentos[i].legenda].diasAfastamento = [...new Set(arrayLegendas[arrayAfastamentos[i].legenda].diasAfastamento.concat(arrayDias))].sort(function (a, b) { //set remove repetidos
                return a - b; //ordena numeros
            });
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
}*/

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
    }
    //inserir tratamento para colagem de celulas


    $('#demo').on('ip_CellInput', cellChanged)

}

function updateHorasTrab() {
    limpaLegendas(legendasEscala)
    for (let i in turnosEscala) {
        for (let j in turnosEscala[i].posicoesOP) {
            let horas = turnosEscala[i].horas
            for (let k in turnosEscala[i].posicoesOP[j].dias) {
                k = parseInt(k)
                let leg = turnosEscala[i].posicoesOP[j].dias[k]
                if (arrayLegendas[leg]) {
                    arrayLegendas[leg].horasTrab = arrayLegendas[leg].horasTrab + horas
                    arrayHorasTrab[leg] = arrayLegendas[leg].horasTrab
                }
            }
        }
    }
}

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

function start() {
    inicializaGradeEscala();

    atualizaTitulo(tituloEscala)

    fillDaysMonth(escala);

    fillDaysWeek(escala);

    //formataCelulasComLegenda(escala);

    formataCabecalhoTurnos(turnosEscala)

    updateCells(escala);

    inicializaEventoInput();
}

$(document).ready(function () {
    getLegendas(urlLegendas)

});
