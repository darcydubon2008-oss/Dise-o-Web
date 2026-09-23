// 1. Credenciales de Supabase
const supabaseUrl = 'https://oaqsujhwwplhyvikzpia.supabase.co';
const supabaseKey = 'sb_publishable_AW01kjaoyNAzwsf9bhmYQA_LyL4SC2-';

// 2. Cliente de Supabase
let supabaseClient = null;


// 3. Esperamos a que cargue el HTML
document.addEventListener('DOMContentLoaded', () => {

    // BOTÓN CONECTAR
    const btnConectar = document.getElementById('btnConectar');

    if (btnConectar) {
        btnConectar.addEventListener('click', conectarSupabase);
    } else {
        console.error("No se encontró el botón btnConectar");
    }


    // BOTÓN BUSCAR
    const btnBuscar = document.getElementById('btnbuscar');

    if (btnBuscar) {
        btnBuscar.addEventListener('click', buscarCategoria);
    } else {
        console.error("No se encontró el botón btnbuscar");
    }

});


// 4. CONECTAR CON SUPABASE
function conectarSupabase() {

    try {

        if (!supabaseClient) {
            supabaseClient = supabase.createClient(
                supabaseUrl,
                supabaseKey
            );
        }

        alert("CONEXIÓN EXITOSA");

        console.log(
            "Cliente Supabase inicializado correctamente:",
            supabaseClient
        );

    } catch (error) {

        alert("ERROR DE CONEXIÓN");

        console.error(
            "Detalles del error:",
            error
        );
    }
}


// 5. BUSCAR CATEGORÍA
async function buscarCategoria() {

    // Verificar conexión
    if (!supabaseClient) {

        alert("Primero debes conectarte 🔌");

        return;
    }


    // Obtener valores
    const id = document
        .getElementById('id_categoria')
        .value
        .trim();

    const nombre = document
        .getElementById('nombre_categoria')
        .value
        .trim();


    // Verificar que haya algo para buscar
    if (!id && !nombre) {

        alert("Ingresa un ID o un Nombre para buscar ⚠️");

        return;
    }


    try {

        // Consulta a la tabla CATEGORIAS
        let query = supabaseClient
            .from('categorias')
            .select('*');


        // Buscar por ID
        if (id) {

            query = query.eq(
                'id_categoria',
                id
            );
        }


        // Buscar por nombre
        if (nombre) {

            query = query.ilike(
                'nombre_categoria',
                `%${nombre}%`
            );
        }


        // Ejecutar consulta
        const { data, error } = await query;


        if (error) {
            throw error;
        }


        // No encontró resultados
        if (!data || data.length === 0) {

            alert("No se encontró ninguna categoría ❌");

            return;
        }


        // Mostrar resultado
        document.getElementById('id_categoria').value =
            data[0].id_categoria;

        document.getElementById('nombre_categoria').value =
            data[0].nombre_categoria;

        document.getElementById('estado').value =
            data[0].estado;


        alert(`✅ Se encontraron ${data.length} resultado(s).`);

        console.log("Resultados:", data);


    } catch (error) {

        alert(
            "Error al buscar ❌: " +
            error.message
        );

        console.error(
            "Detalle del error:",
            error
        );
    }
}
