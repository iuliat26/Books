sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
 ], function (Controller) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.Booklist", {
       
        onDeleteBook(oEvent) {
            const aSelContexts = this.byId("idBooksTable").getSelectedContexts();
        
            const sPathToBook = aSelContexts[0].getPath();
            this.getView().getModel().remove(sPathToBook);
            sap.m.MessageBox.success("Book deleted");
        },

        getDialog : function() {
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment("idForm","org.ubb.books.view.form", this);
            }
            return this.dialog;
        },

        getDialogUpdate : function() {
            if (!this.dialogUpdate) {
                this.dialogUpdate = sap.ui.xmlfragment("idFormUpdate","org.ubb.books.view.updateForm", this);
            }
            return this.dialogUpdate;
        },


        closeDialog : function() {
            this.getDialog().close()
        },

        closeDialogUpdate : function() {
            this.getDialogUpdate().close()
        },

        onSave : function() {
    
            var oISBN = sap.ui.getCore().byId("idForm--idIsbn").getValue();
            var oTitle = sap.ui.getCore().byId("idForm--idTitle").getValue();
            var oAuthor = sap.ui.getCore().byId("idForm--idAuthor").getValue();
            var oLanguage = sap.ui.getCore().byId("idForm--idLanguage").getValue();
            var oDate = sap.ui.getCore().byId("idForm--idDate").getDateValue();
            var oTotal = sap.ui.getCore().byId("idForm--idTotalBooks").getValue();
            var oAvailable = sap.ui.getCore().byId("idForm--idAvailableBooks").getValue();

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" }); 
            var date = new Date(oDate);  
            var dateFormatted = dateFormat.format(oDate);

            var oBook = {
                "Isbn": oISBN,
                "Title": oTitle,
                "Author": oAuthor,
                "Language": oLanguage,
                "DatePublished": dateFormatted,
                "Totalbooks": parseInt(oTotal),
                "Availbooks": parseInt(oAvailable)
            };

            this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_ODATA_IUTA_SRV");
            this.odataModel.create('/Z801_BOOK_ENTITY_IUTASet', oBook, null, function() {
                sap.m.MessageBox.success("Book added!");
                }, function() {
                    sap.m.MessageBox.error("An error occured. Please check the inserted data.");
                }
            );
            this.getView().byId("idBooksTable").getModel().refresh(true);
            this.getDialog().close();
        },

        onUpdate : function() {
            var oISBN = sap.ui.getCore().byId("idFormUpdate--idIsbn").getValue();
            var oTitle = sap.ui.getCore().byId("idFormUpdate--idTitle").getValue();
            var oAuthor = sap.ui.getCore().byId("idFormUpdate--idAuthor").getValue();
            var oLanguage = sap.ui.getCore().byId("idFormUpdate--idLanguage").getValue();
            var oDate = sap.ui.getCore().byId("idFormUpdate--idDate").getDateValue();
            var oTotal = sap.ui.getCore().byId("idFormUpdate--idTotalBooks").getValue();
            var oAvailable = sap.ui.getCore().byId("idFormUpdate--idAvailableBooks").getValue();

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" }); 
            var date = new Date(oDate);  
            var dateFormatted = dateFormat.format(oDate);

            var oBook = {
                "Isbn": oISBN,
                "Title": oTitle,
                "Author": oAuthor,
                "Language": oLanguage,
                "DatePublished": dateFormatted,
                "Totalbooks": parseInt(oTotal),
                "Availbooks": parseInt(oAvailable)
            };

            this.odataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/Z801_ODATA_IUTA_SRV");
            this.odataModel.update("/Z801_BOOK_ENTITY_IUTASet('"+oISBN+"')", oBook, null, function(){
                sap.m.MessageBox.success("Update successful"); 
                }, function(){
                    sap.m.MessageBox.error("An error occured. Please check the inserted data.");
                }
            );
            this.getView().byId("idBooksTable").getModel().refresh(true);
            this.getDialogUpdate().close();
        },
    

        onAddBook(oEvent) {
            this.getDialog().open();

            sap.ui.getCore().byId("idForm--idIsbn").setValue();
            sap.ui.getCore().byId("idForm--idTitle").setValue();
            sap.ui.getCore().byId("idForm--idAuthor").setValue();
            sap.ui.getCore().byId("idForm--idLanguage").setValue();
            sap.ui.getCore().byId("idForm--idDate").setValue();
            sap.ui.getCore().byId("idForm--idTotalBooks").setValue();
            sap.ui.getCore().byId("idForm--idAvailableBooks").setValue();
        },

        onUpdateBook(oEvent) {
            var oTable = this.getView().byId("idBooksTable");
            var selectedItem = oTable.getSelectedItem();
            var isbn = selectedItem.getBindingContext().getProperty("Isbn");
            var title = selectedItem.getBindingContext().getProperty("Title");
            var author = selectedItem.getBindingContext().getProperty("Author");
            var language = selectedItem.getBindingContext().getProperty("Language");
            var date = selectedItem.getBindingContext().getProperty("DatePublished");
            var total = selectedItem.getBindingContext().getProperty("Totalbooks");
            var available = selectedItem.getBindingContext().getProperty("Availbooks");

            this.getDialogUpdate().open();

            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "dd/MM/yyyy" }); 
            var date1 = new Date(date);  
            var dateFormatted = dateFormat.format(date1);

            var total1 = parseInt(total);
            var available1 = parseInt(available);

            sap.ui.getCore().byId("idFormUpdate--idIsbn").setValue(isbn);
            sap.ui.getCore().byId("idFormUpdate--idTitle").setValue(title);
            sap.ui.getCore().byId("idFormUpdate--idAuthor").setValue(author);
            sap.ui.getCore().byId("idFormUpdate--idLanguage").setValue(language);
            sap.ui.getCore().byId("idFormUpdate--idDate").setValue(dateFormatted);
            sap.ui.getCore().byId("idFormUpdate--idTotalBooks").setValue(total1);
            sap.ui.getCore().byId("idFormUpdate--idAvailableBooks").setValue(available1);
        }
    });
 });