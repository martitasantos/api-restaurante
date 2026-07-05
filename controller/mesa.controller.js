const prisma = require('../prisma/cliente')
// controlador que sirve para las acciones de las mesas
 
// metodo para obtener todas las mesas
//funcion asincrona: funcion que se ejecuta en segundo plano
const obtenerMesas = async (req, res) => {
    //select * from mesas = findMany()
    const lista_mesas = await prisma.mesa.findMany();
    res.status(200).json(lista_mesas)
}
 
//funcion para obtener una mesa por su ID
const obtenerMesaById = async (req, res) => {
    // obtener el id de la ruta
    const idMesa = Number(req.params.id)
    // select * from mesas where id = idMesa
    const mesa = await prisma.mesa.findUnique({
        where: { id: idMesa },
    });
 
    // validamos si la mesa no existe
    if(!mesa){
        return res.status(404).json({ error: "Mesa no encontrada" })
    }
 
    res.status(200).json(mesa)
}
 
// funcion para crear una nueva mesa
const crearMesa = async (req, res) => {
    // obtenemos los datos para crear la mesa (body/formulario)
    const { numero, capacidad, disponible } = req.body
 
    // INSERT INTO mesas (numero, capacidad, disponible) VALUES (5, 10, true)
    const nuevaMesa = await prisma.mesa.create({
        data: {
            numero,
            capacidad,
            disponible
        },
    });
 
    // 201 = CREATED SUCCESUFFLY
    res.status(201).json({
        message: "Mesa registrada correctamente",
        mesa: nuevaMesa
    })
}
 
// exportando los metodos para ocuparlos en cualquier lugar
//module.exports = {
//    obtenerMesas,
//    obtenerMesaById,
//    crearMesa
//}
 
//DESDE AQUI CONTINUE LA TAREA
// Función para actualizar una mesa
const actualizarMesa = async (req, res) => {

    const idMesa = Number(req.params.id);
    const { numero, capacidad, disponible } = req.body;

    const mesa = await prisma.mesa.findUnique({
        where: { id: idMesa }
    });

    if (!mesa) {
        return res.status(404).json({
            error: "Mesa no encontrada"
        });
    }

    const mesaActualizada = await prisma.mesa.update({
        where: { id: idMesa },
        data: {
            numero,
            capacidad,
            disponible
        }
    });

    res.status(200).json({
        mensaje: "Mesa actualizada correctamente",
        mesa: mesaActualizada
    });

}

// Función para eliminar una mesa
// Función para desactivar una mesa (Soft Delete)
const eliminarMesa = async (req, res) => {

    const idMesa = Number(req.params.id);

    const mesa = await prisma.mesa.findUnique({
        where: { id: idMesa }
    });

    if (!mesa) {
        return res.status(404).json({
            error: "Mesa no encontrada"
        });
    }

    const mesaDesactivada = await prisma.mesa.update({
        where: { id: idMesa },
        data: {
            disponible: false
        }
    });

    res.status(200).json({
        mensaje: "Mesa desactivada correctamente",
        mesa: mesaDesactivada
    });

}

module.exports = {
    obtenerMesas,
    obtenerMesaById,
    crearMesa,
    actualizarMesa,
    eliminarMesa
}