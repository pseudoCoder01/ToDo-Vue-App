/* eslint-disable quotes */

import Swal from "sweetalert2";

const ProcesarMensajesValidacion = (res) => {
  try {
    var mensajes = '';
    Object.entries(res.errors).forEach(err => {
      err[1].forEach(ie => {
        mensajes += ie + '\n';
      });
    });

  } catch (error) {
    console.log(error);
  }
  return mensajes;
}

export const ShowMessages = (res) => {
  let obj = res.data || res

  if (obj.status == 200) {
    Swal.fire({
      showConfirmButton: true,
      icon: "success",
      title: obj.title,
      text: obj.mensaje,
    });
  } else if (obj.status == 202) {
    Swal.fire({
      showConfirmButton: true,
      icon: "info",
      title: obj.title,
      text: obj.mensaje,
      timer: 1500
    });
  } else if (obj.status == 400) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: obj.mensaje,
    });
  } else if (obj.status == 401) {
    Swal.fire({
      icon: "warning",
      title: obj.title,
      text: obj.mensaje,
    });
  } else if (obj.status == 404) {
    Swal.fire({
      icon: "error",
      title: "No encontrado...",
      text: obj.mensaje,
    });
  } else if (obj.status == 405) {
    Swal.fire({
      icon: "error",
      title: "La accion solicitada no está permitida...",
      text: obj.mensaje,
    });
  } else if (obj.status == 422) {
    Swal.fire({
      icon: "warning",
      title: "Control de Validación",
      text: 'Por favor verifique: ' + ProcesarMensajesValidacion(obj),
    });
  } else if (obj.status == 524) {
    Swal.fire({
      icon: "warning",
      title: "Tiempo de ejecución agotado",
      text: "Si visualiza este mensaje, el tiempo de ejecución de una petición se agotó. No obstante, el proceso que estuvo realizando se guardó. Por favor compruebe en el reporte respectivo.",
      footer: '<strong>Puede intentarlo nuevamente</strong>'
    });
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Un error ocurrió! Si ve este mensaje por favor contacte con soporte",
    });
  }
}

export const ShowMessagesToastr = (res) => {
  if (res.status == 200) {
    Swal.fire({
      showConfirmButton: false,
      icon: "success",
      toast: true,
      position: "bottom-end",
      title: res.data.title,
    });
  } else if (res.status == 202) {
    Swal.fire({
      showConfirmButton: false,
      icon: "success",
      toast: true,
      timer: 3000,
      position: "bottom-end",
      title: res.data.title,
    });
  } else if (res.status == 400) {
    Swal.fire({
      icon: "warning",
      title: res.data.title,
      toast: true,
      timer: 3000,
      position: "bottom-end",
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Ha ocurrido un error a nivel de servidor. Debe contactar al administrador.",
      toast: true,
      timer: 3000,
      position: "bottom-end",
      showConfirmButton: false,
    });
  }
}

export const toastr = (mensaje, type) => {
  Swal.fire({
    showConfirmButton: false,
    icon: type,
    toast: true,
    timer: 3500,
    title: mensaje,
  });
}

export const toastrlong = (msg, type) => {
  Swal.fire({
    showConfirmButton: false,
    icon: type,
    toast: true,
    timer: 4500,
    title: msg,
  });
}
