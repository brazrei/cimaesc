var escala = '072022'
var legendasEscala = '"-","A1 - SO R1 EDUARDO","A4 - 2S LIVIA","A5 - 1S LIDIANE","A6 - 3S COUTINHO",' +
    '"A5 - 1S LIDIANE",' + '"A2 - SO LOBO",' + '"J4 - 1S RENAN",' + '"A3 - 2S MEIRELES",' + '"F1 - SO NERY",' + '"C2 - 1S PORTUGAL",' + '"B5 - 3S MAYARA",' + '"I3 - 3S FABIANO",' + '"J1 - SO R1 AURELIO",' +
    '"F4 - SO CUSTODIO",' + '"D5 - 1S LEONARDO",' + '"B1 - 2S CARLA GUTTEMBERG",' + '"C1 - 2S CINTRA",' + '"A4 - 2S LIVIA",' + '"I4 - 3S MARINS",' + '"J2 - 3S BEATRIZ",' + '"J2 - 3S BEATRIZ"'

var tituloEscala = 'Escala Prevista CMI'
var linhaInicioLegendas = 5
var turnosEscala = [
    { legenda: '1 TURNO_0700P/1900P', primeiro: true, pernoite: false, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'SUP', dias: [] }] },
    { legenda: '2 TURNO_1900P/0000P', primeiro: false, pernoite: false, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }, { titulo: 'SUP', dias: [] }] },
    { legenda: '3 TURNO_0000P/0700P', primeiro: false, pernoite: true, posicoesOP: [{ titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_BRIEF', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG_ROTA', dias: [] }, { titulo: 'AUX_VIG AD', dias: [] }, { titulo: 'OPR_VOLMET', dias: [] }] }
    //{ legenda: '2 TURNO_1900P/0700P', primeiro:false, pernoite: true, posicoesOP: ['AUX_BRIEF', 'AUX_BRIEF', 'AUX_VIG_ROTA', 'AUX_VIG_ROTA', 'AUX_VIG AD', 'AUX_VIG AD', 'OPR_VOLMET', 'OPR_VOLMET', 'SUP']}

]

var dias = []
var totalCols = getTotalCols()
var arrayIndisponibilidadesDia = []

function limpaLegendas(){
    let leg =  legendasEscala.split('","')
    let r = []
    for (let i in leg) {
        r.push(leg[i].split(' - ')[0])
    }
    
    //return '"' + r.join('","') + '"'
    return r.join('","') + '"' 

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

function atualizaIndisponibilidades() {
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

    let dia = l - linhaInicioLegendas + 1
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
    let turnoColOffSet = 2
    let maxCol = 0
    for (let ix in turnosEscala) {
        let i = parseInt(ix)
        let turno = turnosEscala[i]
        let colIni = turnoColOffSet
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
                $('#jqs').ip_FormatCell({
                    controlType: 'dropdown', validation: { validationCriteria: '=dropdown(' + legendasEscala + ')', validationAction: '' },
                    range: [{ startRow: 5, startCol: colIni + j, endRow: dias + 4, endCol: colIni + j }]
                })

            }

        }

        turnoColOffSet = maxCol + 2


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

function verificaLinha(linha, coluna) {
    dia = linha - linhaInicioLegendas + 1

    if (linha < linhaInicioLegendas)
        return false

    for (let i = 2; i < totalCols; i++) {
        $('#demo').ip_FormatCell({ style: 'color:black;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
        $('#demo').ip_FormatCell({ style: 'background-color:white;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
    }

    for (let i = 2; i < totalCols; i++) {
        for (let j = i + 1; j < totalCols - 1; j++) {
            let c1 = $('#demo').ip_CellData(linha, i).display.replace("-", "")
            let c2 = $('#demo').ip_CellData(linha, j).display.replace("-", "")
            if ((c1 !== "") && (c2 !== "") && (c1 == c2)) {
                //alert('duplicado')
                $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
                $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: j, endRow: linha, endCol: j }] })

                // $('#demo').ip_FormatCell({ style: 'color:white;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
                // $('#demo').ip_FormatCell({ style: 'color:white;', range: [{ startRow: linha, startCol: j, endRow: linha, endCol: j }] })

            }


        }
        if (arrayIndisponibilidadesDia[dia] && arrayIndisponibilidadesDia[dia].includes($('#demo').ip_CellData(linha, i).display)) {
            $('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: i, endRow: linha, endCol: i }] })
            //$('#demo').ip_FormatCell({ style: 'background-color:#ffaaaa;', range: [{ startRow: linha, startCol: j, endRow: linha, endCol: j }] })
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
    $('#demo').on('ip_CellInput', function (event, args) {
        let lin = args.options.SetCellValue.Inputs.row
        let col = args.options.SetCellValue.Inputs.col

        updateDias(lin, col)
        verificaLinha(lin, col)

        //verificaIndisponibilidades(lin, col)
        atualizaIndisponibilidades()
        verificaLinha(lin+1, col)



    })

}

$(document).ready(function () {

    legendasEscala = limpaLegendas()

    inicializaGradeEscala();

    atualizaTitulo(tituloEscala)

    fillDaysMonth(escala);

    fillDaysWeek(escala);

    //formataCelulasComLegenda(escala);

    formataCabecalhoTurnos(turnosEscala)

    inicializaEventoInput();


});