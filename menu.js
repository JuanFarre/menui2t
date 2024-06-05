document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/menu_semana')
        .then(response => response.json())
        .then(menuSemanas => {
            fetch('http://localhost:3000/comida')
                .then(response => response.json())
                .then(comidas => {
                    fetch('http://localhost:3000/guarnicion')
                        .then(response => response.json())
                        .then(guarniciones => {
                            const menuTableBody = document.querySelector('#menuTable tbody');

                            const categorizeComida = (comida) => {
                                if (comida.nombre_comida.toLowerCase().includes("empanada")) {
                                    return "Empanada";
                                } else if (comida.nombre_comida.toLowerCase().includes("tarta")) {
                                    return "Tarta";
                                } else if (comida.nombre_comida.toLowerCase().includes("verdura") || 
                                           comida.nombre_comida.toLowerCase().includes("vegetal") || 
                                           comida.nombre_comida.toLowerCase().includes("lentejas") || 
                                           comida.nombre_comida.toLowerCase().includes("berenjena") || 
                                           comida.nombre_comida.toLowerCase().includes("calabaza")) {
                                    return "Vegetariano";
                                } else {
                                    return "Menu";
                                }
                            };

                            const categorizeGuarnicion = (guarnicion) => {
                                if (guarnicion.nombre_guarnicion.toLowerCase().includes("ensalada")) {
                                    return "Ensalada";
                                } else if (guarnicion.nombre_guarnicion.toLowerCase().includes("papa")) {
                                    return "Papa";
                                } else {
                                    return "Otro";
                                }
                            };

                            const tiposComida = ["Menu", "Empanada", "Tarta", "Vegetariano"];
                            const tiposGuarnicion = ["Ensalada", "Papa", "Otro"];

                            tiposComida.forEach(tipo => {
                                const headerRow = document.createElement('tr');
                                const headerCell = document.createElement('td');
                                headerCell.colSpan = 6;
                                headerCell.textContent = tipo;
                                headerCell.style.fontWeight = 'bold';
                                headerCell.style.backgroundColor = '#e0e0e0';
                                headerRow.appendChild(headerCell);
                                menuTableBody.appendChild(headerRow);

                                comidas.filter(comida => categorizeComida(comida) === tipo).forEach(comida => {
                                    const row = document.createElement('tr');
                                    
                                    const idCell = document.createElement('td');
                                    idCell.textContent = comida.id_comida;
                                    row.appendChild(idCell);

                                    const nombreCell = document.createElement('td');
                                    nombreCell.textContent = comida.nombre_comida;
                                    row.appendChild(nombreCell);
                                    
                                    for (let i = 1; i <= 4; i++) {
                                        const semanaCell = document.createElement('td');
                                        const semana = menuSemanas.find(s => s.id_semana === i);
                                        if (semana && semana.comida.includes(comida.id_comida)) {
                                            semanaCell.textContent = 'X';
                                            semanaCell.style.backgroundColor = 'yellow';
                                        }
                                        row.appendChild(semanaCell);
                                    }
                                    
                                    menuTableBody.appendChild(row);
                                });
                            });

                            tiposGuarnicion.forEach(tipo => {
                                const headerRow = document.createElement('tr');
                                const headerCell = document.createElement('td');
                                headerCell.colSpan = 6;
                                headerCell.textContent = tipo;
                                headerCell.style.fontWeight = 'bold';
                                headerCell.style.backgroundColor = '#e0e0e0';
                                headerRow.appendChild(headerCell);
                                menuTableBody.appendChild(headerRow);

                                guarniciones.filter(guarnicion => categorizeGuarnicion(guarnicion) === tipo).forEach(guarnicion => {
                                    const row = document.createElement('tr');
                                    
                                    const idCell = document.createElement('td');
                                    idCell.textContent = guarnicion.id_guarnicion;
                                    row.appendChild(idCell);

                                    const nombreCell = document.createElement('td');
                                    nombreCell.textContent = guarnicion.nombre_guarnicion;
                                    row.appendChild(nombreCell);
                                    
                                    for (let i = 1; i <= 4; i++) {
                                        const semanaCell = document.createElement('td');
                                        const semana = menuSemanas.find(s => s.id_semana === i);
                                        if (semana && semana.guarnicion.includes(guarnicion.id_guarnicion)) {
                                            semanaCell.textContent = 'X';
                                            semanaCell.style.backgroundColor = 'yellow';
                                        }
                                        row.appendChild(semanaCell);
                                    }
                                    
                                    menuTableBody.appendChild(row);
                                });
                            });
                        })
                        .catch(error => console.error('Error fetching guarniciones:', error));
                })
                .catch(error => console.error('Error fetching comidas:', error));
        })
        .catch(error => console.error('Error fetching menu semanas:', error));
});
