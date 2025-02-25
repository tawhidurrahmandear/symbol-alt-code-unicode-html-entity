// Converter for Symbol, Alt Code, Unicode, or HTML Entity
// developed by Tawhidur Rahman Dear, https://www.tawhidurrahmandear.com 
// Live Preview available at https://www.devilhunter.net/p/symbol-alt-code-unicode-html-entity.html

        function convertInput() {
            var input = document.getElementById("altCodeInput").value.trim();
            var inputType = document.getElementById("inputType").value;
            var resultBody = document.getElementById("resultBody");
            resultBody.innerHTML = ""; // Clear the table before inserting new rows

            var symbol, altCode, unicode, htmlEntity;

            if (inputType === "altCode" && /^\d+$/.test(input)) {
                var codeNumber = parseInt(input, 10);
                if (codeNumber >= 0) {
                    symbol = String.fromCharCode(codeNumber);
                    altCode = "Alt+" + input;
                    unicode = "&#x" + codeNumber.toString(16).toUpperCase() + ";";
                    htmlEntity = "&#" + codeNumber + ";";
                }
            }
            else if (inputType === "unicode" && (/^&#x[0-9A-Fa-f]+;$/.test(input) || /^U\+[0-9A-Fa-f]+$/i.test(input))) {
                var hexCode;
                if (input.indexOf("&#x") === 0) {
                    hexCode = input.match(/^&#x([0-9A-Fa-f]+);$/)[1];
                } else if (input.indexOf("U+") === 0) {
                    hexCode = input.match(/^U\+([0-9A-Fa-f]+)$/i)[1];
                }
                var codeNumber = parseInt(hexCode, 16);
                symbol = String.fromCharCode(codeNumber);
                altCode = "Alt+" + codeNumber;
                unicode = "&#x" + hexCode.toUpperCase() + ";";
                htmlEntity = "&#" + codeNumber + ";";
            }
            else if (inputType === "htmlEntity" && /^(&#\d+;|&\w+;)$/.test(input)) {
                var entityName = input.match(/^(&#\d+;|&\w+;)$/)[1];
                var tempElement = document.createElement("div");
                tempElement.innerHTML = entityName;
                symbol = tempElement.textContent;
                var codeNumber = symbol.charCodeAt(0);
                altCode = "Alt+" + codeNumber;
                unicode = "&#x" + codeNumber.toString(16).toUpperCase() + ";";
                htmlEntity = input;
            }
            else if (inputType === "symbol" && Array.from(input).length === 1) {
                symbol = input;
                var codeNumber = input.codePointAt(0);
                altCode = "Alt+" + codeNumber;
                unicode = "&#x" + codeNumber.toString(16).toUpperCase() + ";";
                htmlEntity = "&#" + codeNumber + ";";
            }
            else {
                showAlert("Invalid input. Please check your input and try again.");
                return;
            }

            // If valid, create a row for the table
            if (symbol && altCode && unicode && htmlEntity) {
                var row = document.createElement("tr");
                row.innerHTML = 
                    "<td>" + symbol + "</td>" +
                    "<td>" + altCode + "</td>" +
                    "<td class='code-column'>" + encodeHTML(unicode) + "</td>" +
                    "<td class='code-column'>" + encodeHTML(htmlEntity) + "</td>";
                resultBody.appendChild(row);
            }

            // Show or hide the table
            if (resultBody.children.length > 0) {
                document.getElementById("resultTable").style.display = "table";
            } else {
                document.getElementById("resultTable").style.display = "none";
            }
        }

        // Function to escape HTML entities (so they show as raw code)
        function encodeHTML(str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        // Show alert inside the converter
        function showAlert(message) {
            var alertElement = document.getElementById("alertMessage");
            if (alertElement) {
                alertElement.textContent = message; // Set the message
                alertElement.style.display = "block"; // Show the alert

                // Automatically hide the alert after 5 seconds
                setTimeout(function() {
                    alertElement.style.display = "none"; // Hide the alert
                    alertElement.textContent = ""; // Clear the message
                }, 5000);
            }
        }
