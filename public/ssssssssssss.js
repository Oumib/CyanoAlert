    <script >
                // Références aux éléments DOM
        const tableBody = document.getElementById("tableBody");
        const filterType = document.getElementById("filterType");
        const searchDate = document.getElementById("searchDate");
        const dataModal = document.getElementById("dataModal");
        const visualModal = document.getElementById("visualModal");
        const analysisModal = document.getElementById("analysisModal");
        const loadingModal = document.getElementById("loadingModal");
        let chartInstance = null;

        // Données exemple initiales
        const data = [
            ["70597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-02-09"],
            ["100597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-02-07"],
            ["5597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-02-05"],
            ["3165.0579", "6.886803", "0.04532134", "26.52359", "27.719141", "7.7326207", "4.8687525", "535.5305", "0.29061297", "8.339146", "17.768162", "0.08604662", "0.050528035", "0.06729242", "2.5092754", "0.069730654", "0.030185001", "0.77183914", "1", "2010-02-04"],
            ["11386.945", "11.933899", "0.17398398", "25.2617", "26.350475", "7.770089", "5.382425", "528.22375", "0.26640934", "12.626478", "18.844196", "0.09541435", "0.086498916", "0.095619045", "3.0831628", "0.09421954", "0.042585585", "0.7991801", "1", "2010-02-03"],
            ["4291.7856", "8.92744", "0.07027257", "26.381186", "26.929665", "7.7762375", "4.88581", "540.1024", "0.28030178", "9.917347", "19.398552", "0.08214256", "0.05342417", "0.070251845", "2.470284", "0.080189265", "0.029492434", "0.78883743", "1", "2010-02-02"],
            ["6159.1606", "7.667451", "0.10427276", "25.274647", "27.214554", "7.624171", "5.3343086", "525.35736", "0.2588344", "11.962017", "18.287165", "0.08233839", "0.05715016", "0.06896734", "2.820255", "0.06822632", "0.03205591", "0.8796374", "1", "2010-02-01"],
            ["70597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-01-09"],
            ["100597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-01-07"],
            ["5597.1074", "8.425468", "0.09121279", "25.611347", "26.813923", "7.7725487", "4.7907457", "534.50446", "0.26946953", "11.660808", "19.309471", "0.076199286", "0.055467043", "0.07092523", "2.6943471", "0.08346564", "0.030936556", "0.8014751", "1", "2010-01-05"],
            ["3165.0579", "6.886803", "0.04532134", "26.52359", "27.719141", "7.7326207", "4.8687525", "535.5305", "0.29061297", "8.339146", "17.768162", "0.08604662", "0.050528035", "0.06729242", "2.5092754", "0.069730654", "0.030185001", "0.77183914", "1", "2010-01-04"],
            ["11386.945", "11.933899", "0.17398398", "25.2617", "26.350475", "7.770089", "5.382425", "528.22375", "0.26640934", "12.626478", "18.844196", "0.09541435", "0.086498916", "0.095619045", "3.0831628", "0.09421954", "0.042585585", "0.7991801", "1", "2010-01-03"],
            ["4291.7856", "8.92744", "0.07027257", "26.381186", "26.929665", "7.7762375", "4.88581", "540.1024", "0.28030178", "9.917347", "19.398552", "0.08214256", "0.05342417", "0.070251845", "2.470284", "0.080189265", "0.029492434", "0.78883743", "1", "2010-01-02"],
            ["6159.1606", "7.667451", "0.10427276", "25.274647", "27.214554", "7.624171", "5.3343086", "525.35736", "0.2588344", "11.962017", "18.287165", "0.08233839", "0.05715016", "0.06896734", "2.820255", "0.06822632", "0.03205591", "0.8796374", "1", "2010-01-01"],
            
                ];

        // Fonction pour afficher les données dans le tableau
        function populateTable(dataToDisplay) {
            tableBody.innerHTML = "";
            dataToDisplay.forEach(row => {
                const tr = document.createElement("tr");
                row.forEach(value => {
                    const td = document.createElement("td");
                    td.textContent = value;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        }

        // Fonction qui applique les filtres sur les données
        function applyFilters() {
            let filteredData = data;

            // Filtre sur la densité
            const filter = filterType.value;
            if (filter !== "all") {
                filteredData = filteredData.filter(row => {
                    const density = parseFloat(row[0]);
                    if (filter === "lt60000") return density < 60000;
                    if (filter === "between60000and100000") return density >= 60000 && density <= 100000;
                    if (filter === "gt100000") return density > 100000;
                    return true;
                });
            }

            // Filtre sur la date (égalité stricte)
            if (searchDate.value) {
                filteredData = filteredData.filter(row => row[19] === searchDate.value);
            }

            populateTable(filteredData);
        }

        // Recherche par date via bouton (appelle applyFilters)
        function searchByDate() {
            applyFilters();
        }

        // Ouvrir/fermer la modale d'ajout de données
        function openModal() {
            dataModal.style.display = "flex";
        }
        function closeModal() {
            dataModal.style.display = "none";
        }

        // Fonction pour valider et ajouter une nouvelle ligne de données
        function addRow(event) {
            event.preventDefault();
            const form = event.target;
            const inputs = Array.from(form.elements).filter(el => el.tagName === "INPUT");
            const newRow = inputs.map(input => input.value.trim());

            // Vérification que tous les champs sont remplis
            if (newRow.some(val => val === "")) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            // Optionnel : validation des nombres (pour Density par exemple)
            if (isNaN(parseFloat(newRow[0]))) {
                alert("La densité doit être un nombre valide.");
                return;
            }

            // Ajouter la nouvelle ligne au début du tableau
            data.unshift(newRow); 
            populateTable(data);
            form.reset();
            closeModal();

            // Afficher le modal de chargement pendant 2s 
            loadingModal.style.display = "flex";
            setTimeout(() => {
                loadingModal.style.display = "none";
            }, 2000);
        }


        // Gestion des modales Visualisation
        document.getElementById("openVisualModal").addEventListener("click", () => {
            visualModal.style.display = "flex";
        });
        document.getElementById("closeVisualModal").addEventListener("click", () => {
            visualModal.style.display = "none";
        });

        // Visualiser toutes les données dans le graphique
        document.getElementById("showAllData").addEventListener("click", () => {
            showAnalysisChart(data);
            visualModal.style.display = "none";
        });

        // Visualiser un intervalle de dates dans le graphique
        document.getElementById("showIntervalData").addEventListener("click", () => {
            const start = document.getElementById("startDate").value;
            const end = document.getElementById("endDate").value;

            if (!start || !end) {
                alert("Veuillez choisir une plage de dates complète.");
                return;
            }
            if (start > end) {
                alert("La date de début doit être antérieure ou égale à la date de fin.");
                return;
            }

            const filtered = data.filter(row => row[19] >= start && row[19] <= end);
            showAnalysisChart(filtered);
            visualModal.style.display = "none";
        });

        // Fermer la modale d'analyse
        function closeAnalysis() {
            analysisModal.style.display = "none";
        }

        // Fonction pour afficher le graphique de densité moyenne par date
        function showAnalysisChart(dataset) {
            const dateMap = {};
            dataset.forEach(row => {
                const date = row[19];
                const density = parseFloat(row[0]);
                if (!dateMap[date]) {
                    dateMap[date] = { total: 0, count: 0 };
                }
                dateMap[date].total += density;
                dateMap[date].count += 1;
            });

            const labels = Object.keys(dateMap).sort(); // Tri des dates
            const values = labels.map(date => (dateMap[date].total / dateMap[date].count));

            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = document.getElementById("analysisChart").getContext("2d");
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Densité moyenne',
                        data: values,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.3,
                        fill: true,
                        backgroundColor: 'rgba(75,192,192,0.2)'
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                tooltipFormat: 'yyyy-MM-dd'
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Densité moyenne'
                            }
                        }
                    }
                }
            });

            analysisModal.style.display = "flex";
        }
        document.addEventListener('DOMContentLoaded', () => {
            const analyseBtn = document.getElementById('analyseBtn');
            const accessKeyInput = document.getElementById('accessKeyInput');
            const keyErrorMsg = document.getElementById('keyErrorMsg');

            analyseBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const key = accessKeyInput.value.trim();

                if (!key) {
                    keyErrorMsg.style.display = "block";
                    keyErrorMsg.textContent = "Veuillez entrer votre clé d'accès avant de lancer l'analyse.";
                    accessKeyInput.focus();
                    return;
                }

                if (key === "2025") {
                    keyErrorMsg.style.display = "none";
                    closeAnalysis();
                    openAdvancedAnalysis();
                } else {
                    keyErrorMsg.style.display = "block";
                    keyErrorMsg.innerHTML = 'Clé expirée ou erronée. Profitez de nos offres sur la page <a href="offre.html" style="color:bleu; text-decoration:underline;">offres</a>.';
                }
            });

            // Optionnel : gestion du bouton Rapport dans la nouvelle modale
            const reportBtn = document.getElementById('reportBtn');
            reportBtn.addEventListener('click', () => {
                alert("Génération du rapport en cours...\nVous trouverez votre rapport dans la page rapport."); 
                // Remplace par ta logique réelle pour générer ou afficher le rapport
            });
        });

        // Fonctions d'ouverture/fermeture des modales

        function openAnalysis() {
            document.getElementById('analysisModal').style.display = 'flex';
            document.getElementById('accessKeyInput').value = ''; // reset champ
            document.getElementById('keyErrorMsg').style.display = 'none'; // reset erreur
            document.getElementById('accessKeyInput').focus();
        }

        function closeAnalysis() {
            document.getElementById('analysisModal').style.display = 'none';
        }

        function openAdvancedAnalysis() {
            document.getElementById('advancedAnalysisModal').style.display = 'flex';
        }

        function closeAdvancedAnalysis() {
            document.getElementById('advancedAnalysisModal').style.display = 'none';
        }



        // Événements pour filtrage dynamique
        filterType.addEventListener("change", applyFilters);
        searchDate.addEventListener("input", applyFilters);

        // Initialiser le tableau au chargement
        populateTable(data);

    </script>
    