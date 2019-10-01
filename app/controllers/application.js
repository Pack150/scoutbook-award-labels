import Controller from '@ember/controller';
import PapaParse from 'papaparse';
import * as jsPDF from 'jspdf';
import debugLogger from 'ember-debug-logger';

function drawGrid(document, width, height, columns, rows) {
  const colWidth = Math.round((width / columns) * 100) / 100;
  const rowHeight = Math.round((height / rows) * 100) / 100;

  // vertical lines
  for (let i = 1; i < columns; i++) {
    let x = colWidth * i;
    document.line(x, 0, x, height);
  }
  // horizontal lines
  for (let i = 1; i < rows; i++) {
    let y = rowHeight * i;
    document.line(0, y, width, y);
  }
}

export default Controller.extend({
  debug: debugLogger(),
//  haveData: false,
  awardData: false,
  printPreview: false,
  scoutCount: 0,
  makePDF: function() {
    // Letter Paper is 215.9 mm x 279.4 mm

    // make sure to import jsPDF
    let doc = new jsPDF('portrait', 'pt', 'letter');
    doc.setFont('helvetica');

    // 72pts per inch
    const pageWidth = 612; // 8.5 inches
    const pageHeight = 791; // 11 inches
    const totalScouts = this.scoutCount;
    const columns = 4;
    const rows = 3;
    const perPage = columns * rows;

    const labelWidth = pageWidth/columns;
    const labelHeight = pageHeight/rows;

    const labelXPadding = 20;
    const labelYPadding = 25;

    const labelTextWidth = labelWidth - (labelXPadding * 2);

    const lineHeight = 1.25;
    const denFontSize = 9;
    const scoutNameFontSize = 14;
    const awardFontSize = 12;


    const scoutNameUnderlineOffset = 2;
    const underlineBottomPadding = 5;

    const awardListBottomPadding = 7;

    const awardNameBullet = ' - ';
    const awardNameIndent = '    ';

    let counter = 0;

    drawGrid(doc, pageWidth, pageHeight, columns, rows);

    for (let denName in this.awardData) {
      for (let scoutName in this.awardData[denName]) {
        let xOffset = 0;
        let yOffset = 0;
        let placeOnPage = counter;
        let rowIndex = 0;
        let colIndex = 0;

        if (placeOnPage >= perPage) {
          placeOnPage = placeOnPage % perPage;
        }
        if (placeOnPage >= columns) {
          rowIndex = Math.floor(placeOnPage / columns);
        }

        colIndex = placeOnPage % columns;

        xOffset = Math.round(labelWidth*colIndex*100)/100;
        yOffset = Math.round(labelHeight*rowIndex*100)/100;
        yOffset = yOffset + labelYPadding;
        this.debug(`${rowIndex}, ${yOffset} : ${colIndex},${xOffset} : ${placeOnPage} : ${scoutName}`);

        doc.setLineHeightFactor(lineHeight);

        // Insert the Den Name
        doc.setFontSize(denFontSize);
        doc.setFontStyle('italic');
        yOffset = yOffset + (denFontSize*lineHeight);
        doc.text(
          denName,
          xOffset+labelTextWidth+labelXPadding,
          yOffset,
          {
            align: 'right'
          }
        );
        doc.setFontStyle('normal');

        // Insert the Scout Name
        doc.setFontSize(scoutNameFontSize);
        yOffset = yOffset + (scoutNameFontSize*lineHeight);
        let splitScoutName = doc.splitTextToSize(scoutName, labelTextWidth);
        doc.text(
          splitScoutName,
          xOffset+labelXPadding,
          yOffset
        );
        // this should only ever split to two lines
        if (splitScoutName.length > 1) {
          yOffset = yOffset + (scoutNameFontSize*lineHeight);
        }

        // Add the underline and some padding before the awards
        yOffset=yOffset + scoutNameUnderlineOffset;
        doc.line(xOffset,yOffset,xOffset+labelWidth, yOffset);
        yOffset=yOffset + underlineBottomPadding;

        // Insert the Awards
        doc.setFontSize(awardFontSize);
        yOffset=yOffset + (awardFontSize * lineHeight);

        ['adventures','awards','ranks'].forEach((awardType)=>{
          if (this.awardData[denName][scoutName][awardType].length === 0) {
            return;
          }
          let awardsList = [];

          switch (awardType) {
            case 'adventures':
              awardsList.push('Adventures:');
              break;
            case 'awards':
              awardsList.push('Awards:');
              break;
            default:
            awardsList.push('Rank:');
              break;
          }

          this.awardData[denName][scoutName][awardType].forEach((award)=>{
            let awardName = awardNameBullet + award;
            let splitAwardName = doc.splitTextToSize(awardName, labelTextWidth);
            awardsList.push(splitAwardName[0]);

            // there should only ever be two lines
            if (splitAwardName[1]) {
              awardsList.push(awardNameIndent + splitAwardName[1]);
            }
          });
          // insert an empty line
          //          awardsList.push(' ');
          doc.text(
            awardsList,
            xOffset+labelXPadding,
            yOffset
          );
          // move yOffset down by the number of lines, plus a small padding
          yOffset = yOffset + (awardFontSize * lineHeight * awardsList.length) + awardListBottomPadding;
        })

        // advance counter and then decide if we need to add a new page
        counter++;
        if ( (counter < totalScouts) && (counter%perPage === 0)) {
          this.debug('adding a new page');
          doc.addPage('letter','p');
          drawGrid(doc, pageWidth, pageHeight, columns, rows);
        }
      }
    }
    doc.save("awardLabels.pdf");
  },

  actions: {
    parseFile: function (event) {
      let awardFile = event.srcElement.files[0];
      if (awardFile === undefined) {
        return;
      }
      PapaParse.parse(awardFile, {
        header: true,
        complete: (results) => {
          let awardData = {};
          let counter = 0;
          results.data.forEach((row)=>{
            if (typeof row['Item Name'] === "undefined") {
              // probably the end of the file
              return;
            }
            let subUnit = `${row['Den Type']} Den ${row['Den Number']}`;
            let scoutName = `${row['First Name']} ${row['Last Name']}`;
            let itemName = row['Item Name'].replace(/cub scouts\b|\badventure\b|\bemblem|award patch/ig,'');
            if (!awardData[subUnit]) {
              awardData[subUnit]={};
            }
            if (!awardData[subUnit][scoutName]) {
              counter++;
              awardData[subUnit][scoutName] = {
                adventures: [],
                awards: [],
                ranks: []
              }
            }
            switch  (row['Item Type']) {
              case 'Misc Awards':
                awardData[subUnit][scoutName]['awards'].push(itemName);
                break;
              case 'Badges of Rank':
                awardData[subUnit][scoutName]['ranks'].push(itemName);
                break;
              default:
                awardData[subUnit][scoutName]['adventures'].push(itemName);
            }

            switch (row['Den Type']) {
              case 'Lion':
              case 'Tiger':
              case 'Wolf':
              case 'Bear':
                awardData[subUnit][scoutName]['denClass'] = row['Den Type'].toLowerCase();
                break;
              default:
                awardData[subUnit][scoutName]['denClass'] = 'webelos';
                break;
            }
          });
          this.set('awardData', awardData);
          this.set('scoutCount', counter);
          this.makePDF();
        }
      });
    }
  }
});
