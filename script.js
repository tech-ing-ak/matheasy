function completarAcceso() {
    const correo = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const key = document.getElementById("license_key").value;

    if (!correo || !pass || !key) {
        alert("Por favor, rellena todos los campos");
        return;
    }

    fetch('/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correo, password: pass, key: key })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Guardamos el estado localmente
            localStorage.setItem("app_acceso_completado", "true");
            
            // Usamos tu función cerrarVentana() que ya tiene la lógica de pywebview
            alert("¡Licencia Activada! Iniciando aplicación...");
            cerrarVentana(); 
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        // Si el servidor se cierra muy rápido, el fetch puede dar error
        // pero si la app principal ya abrió, podemos cerrar el login de todos modos
        console.log("Cerrando login...");
        cerrarVentana();
    });
}

function cerrarVentana() {
    // Primero intentamos la API de pywebview (es la más confiable)
    if (window.pywebview && window.pywebview.api) {
        window.pywebview.api.close_window();
    } else {
        // Si no, el método estándar
        window.close();
    }
}

function minimizarVentana() {
    if (window.pywebview && window.pywebview.api) {
        window.pywebview.api.minimize();
    }
}