import getId from "./radomId";

const createVueNode = (event, addNodes, project, store) => {
  let id = getId();

  const type = event.dataTransfer?.getData("application/vueflow");
  const position = project({ x: event.clientX - 450, y: event.clientY - 20 });

  let newNode = {
    id: type + id,
    type,
    position,
    label: `${type} node`,
  };

  ////////////////////////////////////////////.
  switch (type) {
    case "facebook-message":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "facebook-message",
          label: "Label",
          color: "#ffffff",
          items: [
            {
              id: getId(),
              type: "messengerTextVue",
              text: "Entre le Message",
              buttons: [],
            },
          ],
        });
      });
      break;

    case "starting-step":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "starting-step",
          label: "Label",
          content: "Type",
          color: "#ffffff",
          items: [],
        });
      });
      break;

    case "container":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "container",
          label: "Label",
          width: "20rem",
          height: "10rem",
          color: "#3A8CC7",
        });
      });
      break;

    case "redirector":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "redirector",
          label: "Label",
          color: "#000000",
        });
      });
      break;

    case "node-image":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "node-image",
          label: "Label",
          src: "",
          width: "300px",
          height: "120px",
          color: "#000000",
        });
      });
      break;

    case "free-mind":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "free-mind",
          label: "Label",
          src: "",
          width: "25em",
          height: "14em",
          color: "#40CE03",
        });
      });
      break;

    case "box-with-title":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "box-with-title",
          label: "Label",
          title: "Title",
          subtitle: "Subtitle",
          color: "#000000",
        });
      });
      break;

    case "simple-text":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "simple-text",
          subtitle: "Subtitle",
          color: "#000000",
        });
      });
      break;

    case "quick-reply":
      store.$patch((state) => {
        state.layers.messages.push({
          id: newNode.id,
          type: "quick-reply",
          text: "Quick Reply",
          color: "#ffffff",
        });
      });
      break;

    default:
      break;
  }
  ////////////////////////////////////////////.

  // Implementation of a basic container catching
  if (event.target.parentNode.id.substring(-1, 9) === "container") {
    newNode.parentNode = event.target.parentNode.id;
  }
  ////////////////////////////////////////////.

  addNodes([newNode]);
};

export default createVueNode;
