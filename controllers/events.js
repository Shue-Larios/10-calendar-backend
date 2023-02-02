const { response } = require('express');
const Evento = require('../models/Evento');

// las principal esta en routes/events
const getEvento = async (req, res = response) => {

   // retornar la lista de todos los eventos
   // populate('user', 'name'); me trae informacion especifica
   const eventos = await Evento.find().populate('user', 'name');

   res.json({
      ok: true,
      // muestra todos los eventos
      eventos
   })

}
// tengo verificado que tengo el evento
const crearEvento = async (req, res = response) => {
   const evento = new Evento(req.body); // nueva instancia de mi modelo
   try {
      // necesito el id del usuario
      evento.user = req.uid;

      // grabamos el evento en la base
      const eventoGuardado = await evento.save(); // await espera q esto termine
      res.json({
         ok: true,
         evento: eventoGuardado
      })



   } catch (error) {
      console.log(error);
      // status 500 como un error interno 
      res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }

}

const actualizarEvento = async (req, res = response) => {

   // obtener el id desde la url
   const eventoid = req.params.id;
   // el uid es el del usuario
   const uid = req.uid

   // necesito interactuar con la base x eso va en un trycatch
   try {

      // verificar si existe en la base
      const evento = await Evento.findById(eventoid);

      // si el id no es correcto
      if (!evento) {
         // cuando algo no existe este es el codgio
         return res.status(404).json({
            ok: false,
            msg: 'El evento no existe con ese id'
         })
      }


      // verificar si la persona creo el evento
      if (evento.user.toString() !== uid) {
         // este es el codigo de error si la persona no esta autorizada
         return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegios de editar este evento'
         })
      }

      // si llega a este punto significa q si la persona creo la nota
      const nuevoEvento ={
         // desestrcuturo todo lo q viene en el
         ...req.body,
         user: uid,
      }

      // aca ya tengo la nueva data es momento de actualizar
      // findByIdAndUpdate busca un evento por el id y lo actualiza
      const eventoActualizado = await Evento.findByIdAndUpdate( eventoid,nuevoEvento, {new: true} );

      return res.json({
         ok: true,
        evento: eventoActualizado
      });


   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }

}

const eliminarEvento = async (req, res = response) => {

   // obtener el id desde la url
   const eventoid = req.params.id;
   // el uid es el del usuario
   const uid = req.uid

   // necesito interactuar con la base x eso va en un trycatch
   try {

      // verificar si existe en la base
      const evento = await Evento.findById(eventoid);

      // si el id no es correcto
      if (!evento) {
         // cuando algo no existe este es el codgio
        return res.status(404).json({
            ok: false,
            msg: 'El evento no existe con ese id'
         })
      }

      // verificar si la persona creo el evento
      if (evento.user.toString() !== uid) {
         // este es el codigo de error si la persona no esta autorizada
         return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegios para eliminar este evento'
         })
      }

      // aca ya tengo la nueva data es momento de actualizar
      // findByIdAndUpdate busca un evento por el id y lo actualiza
       await Evento.findByIdAndDelete( eventoid, {new: true} )
      
      return res.json({
         ok: true,
      });


   } catch (error) {
      console.log(error);
     return res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }











   /////////////////////////////
   res.json({
      ok: true,
      msg: 'eliminarEvento'
   })

}




module.exports = {
   getEvento,
   crearEvento,
   actualizarEvento,
   eliminarEvento
}




