/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

var DIALOG_TITLE = 'Example Dialog';
var SIDEBAR_TITLE = 'Example Sidebar';

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('Tote')
      .addItem('Show search sidebar', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Filters the sheet by the filter object
 *
 *  @param {Object} object An object with filter criteria
 */
function filterSheet(data) {
  // get filter object
  
  
  
  // get current sheet and values
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
     sheet = ss.getActiveSheet();
  // This represents ALL the data
  var range = sheet.getDataRange();
  var values = range.getValues();
  // loop through rows in sheet and hide if filter criteria not present

  for (var i = 1; i < values.length; i++) 
  {
    var row = values[i], 
        hideRow = false,
        cell;
    // filter for hot months
    if (data.hot)
    {
      
      cell = row[15];
      Logger.log("looking for hot month "+data.month+" in cell: "+cell);
      Logger.log("cell.indexOf(data.month)==-1: "+(cell.indexOf(data.month==-1)));
      if (cell.indexOf(data.month)==-1)
      {
          hideRow = true;
      }
    }
    // filter for good for kids
    if (data.gfk)
    {
      cell = row[12];
      if (cell != "Yes")
      {
          hideRow = true;
      }
    }
    // filter for city
    if (data.city)
    {
      cell = row[17];
      if (cell != "Yes")
      {
          hideRow = true;
      }
    }
    // filter for GFW
    if (data.gfw)
    {
      cell = row[24];
      if (cell != "Yes")
      {
          hideRow = true;
      }
    }
     // filter for beach
    if (data.beach)
    {
      cell = row[25];
      if (cell != "Yes")
      {
          hideRow = true;
      }
    }
    // filter for maxcost
    if (data.maxcost)
    {
      cell = row[2];
      if (cell > data.maxcost)
      {
          hideRow = true;
      }
    }
    // filter for maxFlightCost
    if (data.maxFlightCost)
    {
      cell = row[7];
      if (cell > data.maxFlightCost)
      {
          hideRow = true;
      }
    }
    // filter for hoursFlight
    if (data.hoursFlight)
    {
      cell = row[10];
      if (cell > data.hoursFlight)
      {
          hideRow = true;
      }
    }
      // filter for hoursDrive
    if (data.hoursDrive)
    {
      cell = row[9];
      if (cell > data.hoursDrive)
      {
          hideRow = true;
      }
    }
    
    // hie the row if needed
    if (hideRow)
    {
      sheet.hideRows(i+1)  
    } else
    {
      sheet.showRows(i+1)
    }
     
    
  }
}
  
 /**
 * Resets the sheet to show hidden rows
 *
 *  @param {Object} object An object with filter criteria
 */
function resetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getActiveSheet(),
     maxRows = sheet.getMaxRows();
 // Unhides the first three rows
 sheet.showRows(1, maxRows);

}
