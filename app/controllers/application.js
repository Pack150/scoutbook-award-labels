import Controller from '@ember/controller';
import PapaParse from 'papaparse';
import debugLogger from 'ember-debug-logger';

export default Controller.extend({
  debug: debugLogger(),
  haveData: false,
  awardData: false,
  actions: {
    parseFile: function (event) {
      this.set('haveData',true)

      let awardFile = event.srcElement.files[0];
      if (awardFile === undefined) {
        this.set('haveData',false);
        return;
      }
      PapaParse.parse(awardFile, {
        header: true,
        complete: (results) => {
          let awardData = {};
          results.data.forEach((scout)=>{
            if (typeof scout['Item Name'] === "undefined") {
              // probably the end of the file
              return;
            }

            let subUnit = `${scout['Den Type']} Den ${scout['Den Number']}`;
            let scoutName = `${scout['First Name']} ${scout['Last Name']}`;
            let itemName = scout['Item Name'].replace(/ adventure|emblem|award patch/i,'');
            if (!awardData[subUnit]) {
              awardData[subUnit]={};
            }
            if (!awardData[subUnit][scoutName]) {
              awardData[subUnit][scoutName] = {
                adventures: [],
                awards: [],
                ranks: []
              }
            }
            switch  (scout['Item Type']) {
              case 'Misc Awards':
                awardData[subUnit][scoutName]['awards'].push(itemName);
                break;
              case 'Badges of Rank':
                awardData[subUnit][scoutName]['ranks'].push(itemName);
                break;
              default:
                awardData[subUnit][scoutName]['adventures'].push(itemName);
            }

            switch (scout['Den Type']) {
              case 'Lion':
              case 'Tiger':
              case 'Wolf':
              case 'Bear':
                awardData[subUnit][scoutName]['denClass'] = scout['Den Type'].toLowerCase();
                break;
              default:
                awardData[subUnit][scoutName]['denClass'] = 'webelos';
                break;
            }
          });
          this.set('awardData', awardData);
        }
      });
    }
  }
});
