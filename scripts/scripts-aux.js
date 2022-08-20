escala = opener.escala
tituloEscala = opener.tituloEscala

$(document).ready(() => {
    atualizaTitulo(tituloEscala)
    inicializaGradeAuxiliar()

    //opener.atualizaTitulo(tituloEscala)

    opener.fillDaysWeek(escala, $('#demo'));
    opener.fillDaysMonth(escala, $('#demo'));
    fillLegendas();
    $('#demo').ip_ResizeColumn({ columns: [-1], size: 35 })
    inicializaEventoClick();
    inicializaEventoDblClick();

})

function inicializaGradeAuxiliar() {
    $('#demo').ip_Grid({ rows: 41, cols: 100 });

}

function atualizaTitulo(titulo) {
    $('#h1Titulo').html(`${titulo}: ${escala.substr(0, 2)}/${escala.substr(2, 4)}`)

}

function inicializaEventoDblClick() {
    $('#demo').on('dblclick', function (arg) {
        console.log("Duplo click")
    })
}

function inicializaEventoClick() {
    $('#demo').on('click', function (arg) {
        /*let oldData = $('#demo').ip_CellData(0, 0).display
        $('#demo').ip_Copy();
        $('#demo').ip_Paste({row:0,col:0});
        globalSelectedLegenda = $('#demo').ip_CellData(0, 0).display

        $('#jqs').ip_CellInput({ valueRAW: oldData, range: [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }] })

        */
        //$('#demo').ip_SelectCell({ row:0, col:0 })
        opener.globalSelectedLegenda = ""

        opener.clearBorders()

        opener.selectAllLeg(opener.globalSelectedLegenda, true)

        opener.globalSelectedLegenda = arg.target.innerText

        opener.selectAllLeg(opener.globalSelectedLegenda)

    })


}

function setStrCell(lin, col, txt, color = false, title = false) {

    $('#demo').ip_FormatCell({ style: `font-weight: bold;`, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })
    if (color)
        $('#demo').ip_FormatCell({ style: `color:${color};`, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })
    if (title)
        $('#demo').ip_FormatCell({ style: `tab-size:${title};`, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] }) //usa o tab-size para repassar o dia
    $('#demo').ip_CellInput({ valueRAW: txt, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })
}

function setCellColor(lin, col, color) {
    $('#demo').ip_FormatCell({ style: `background-color:${color};`, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })

}

function setFontColor(lin, col, color) {
    $('#demo').ip_FormatCell({ style: `color:${color};`, range: [{ startRow: lin, startCol: col, endRow: lin, endCol: col }] })

}

function setColColor(linIni, linFin, col, color) {
    $('#demo').ip_FormatCell({ style: `background-color:${color};`, range: [{ startRow: linIni, startCol: col, endRow: linFin, endCol: col }] })
}
function fillLegendas() {

    //
    opener.updateArrayFolgas()

    arrLeg = opener.sortByCargaTrab(opener.arrayLegendas);
    let diasMes = opener.getDaysInCurrentMonth(escala)
    let linha = 2
    let colIni = 2
    let col = colIni

    //
    $('#demo').ip_MergeRange({ range: [{ startRow: linha + 2 + diasMes + 1, startCol: 0, endRow: linha + 2 + diasMes + 1, endCol: 1 }] })
    $('#demo').ip_MergeRange({ range: [{ startRow: linha + 2 + diasMes + 2, startCol: 0, endRow: linha + 2 + diasMes + 2, endCol: 1 }] })
    $('#demo').ip_MergeRange({ range: [{ startRow: linha + 2 + diasMes + 3, startCol: 0, endRow: linha + 2 + diasMes + 3, endCol: 1 }] })
    setStrCell(linha + 2 + diasMes + 1, 0, "Diurnos")
    setStrCell(linha + 2 + diasMes + 2, 0, "Pernoites")
    setStrCell(linha + 2 + diasMes + 3, 0, "Total")
    //

    for (let i in arrLeg) {
        setStrCell(linha, col, arrLeg[i].legenda)
        setStrCell(linha + 1, col, `(${arrLeg[i].percentualCargaTrab}%)`)
        setStrCell(linha + 2, col, arrLeg[i].horasTrab + 'h')

        //folgas
        setColColor(linha + 3, linha + 2 + diasMes, col, 'green')
        $('#demo').ip_CellInput({ valueRAW: arrLeg[i].legenda, range: [{ startRow: linha + 3, startCol: col, endRow: linha + 2 + diasMes, endCol: col }] })
        $('#demo').ip_FormatCell({ style: `color:green;font-weight: bold;text-decoration: none;`, range: [{ startRow: linha + 3, startCol: col, endRow: linha + 2 + diasMes, endCol: col }] })

        for (let f in arrLeg[i].diasDeFolga) {
            if (arrLeg[i].diasDeFolga[f] > 4) {
                $('#demo').ip_FormatCell({ style: `background-color:yellow;`, range: [{ startRow: linha + 2 + parseInt(f), startCol: col, endRow: linha + 2 + parseInt(f), endCol: col }] })
                $('#demo').ip_FormatCell({ style: `color: yellow; text-decoration: none;`, range: [{ startRow: linha + 2 + parseInt(f), startCol: col, endRow: linha + 2 + parseInt(f), endCol: col }] })
            }
        }

        if (arrLeg[i].diasAfastamento) {
            let arrAf = arrLeg[i].diasAfastamento

            for (let j in arrAf) {
                let l = linha + 2 + arrAf[j]
                let c = col

                setCellColor(l, c, "red")
                setStrCell(l, c, arrLeg[i].legenda, 'red', arrAf[j])

                if (opener.arrayRISAER[arrLeg[i].legenda] && opener.arrayRISAER[arrLeg[i].legenda].indexOf(arrAf[j]) > -1) {  //RISAER
                    setFontColor(l, c, "white")
                    $('#demo').ip_FormatCell({ style: `background-color:blue;`, range: [{ startRow: l, startCol: c, endRow: l, endCol: c }] })
                }
            }

        }

        if (arrLeg[i].diasTrab) {
            let arrTrab = arrLeg[i].diasTrab

            for (let j in arrTrab) {
                setCellColor(linha + 2 + arrTrab[j], col, "black")
                setStrCell(linha + 2 + arrTrab[j], col, arrLeg[i].legenda, 'white', arrTrab[j])
                if (opener.checkPernoite(arrLeg[i].legenda, arrTrab[j]))
                    $('#demo').ip_FormatCell({ style: `color: white; text-decoration: underline;`, range: [{ startRow: linha + 2 + arrTrab[j], startCol: col, endRow: linha + 2 + arrTrab[j], endCol: col }] })
                else
                    $('#demo').ip_FormatCell({ style: `color: white; text-decoration: none;`, range: [{ startRow: linha + 2 + arrTrab[j], startCol: col, endRow: linha + 2 + arrTrab[j], endCol: col }] })
            }

        }

        setStrCell(linha + 2 + diasMes + 1, col, arrLeg[i].diasTrab.length - arrLeg[i].diasPernoite.length)
        setStrCell(linha + 2 + diasMes + 2, col, arrLeg[i].diasPernoite.length)
        setStrCell(linha + 2 + diasMes + 3, col, arrLeg[i].diasTrab.length)
        $('#demo').ip_FormatCell({ style: `color:black;font-weight: bold;text-decoration: none;`, range: [{ startRow: linha + 2 + diasMes + 1, startCol: col, endRow: linha + 2 + diasMes + 1, endCol: col }] })
        $('#demo').ip_FormatCell({ style: `color:black;font-weight: bold;text-decoration: none;`, range: [{ startRow: linha + 2 + diasMes + 2, startCol: col, endRow: linha + 2 + diasMes + 2, endCol: col }] })
        $('#demo').ip_FormatCell({ style: `color:black;font-weight: bold;text-decoration: none;`, range: [{ startRow: linha + 2 + diasMes + 3, startCol: col, endRow: linha + 2 + diasMes + 3, endCol: col }] })
        col++
    }
}

function selectFolgados(dia) {
    let linha = 2
    let colIni = 2
    let col = colIni

    let arrLeg = opener.arrayLegendas

    for (let i in arrLeg) {
        let leg = $('#demo').ip_CellData(linha, col).display
        if (arrLeg[leg].diasFolga.indexOf(dia) > -1) {
            setCellColor(linha,col,"green");
            setFontColor(linha,col,"white");
        } else {
            setCellColor(linha,col,"white");
            setFontColor(linha,col,"black");
        }
        col++
    }
}