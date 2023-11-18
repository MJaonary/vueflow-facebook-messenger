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

  //////////////////////////////////////////.
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
              text: "Enter Message Text",
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
          width: "340px",
          height: "240px",
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
          width: "340px",
          height: "240px",
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
  //////////////////////////////////////////.

  // Implementation of a basic container catching
  if (event.target.parentNode.id.substring(-1, 9) === "container") {
    newNode.parentNode = event.target.parentNode.id;
  }
  ////////////////////////////////////////////.

  addNodes([newNode]);
};

const copyVueNode = (addNodes, eid, getNode, store) => {
  let id = getId(); // Create a New UUid
  const nodeById = getNode.value(eid); // Get The node to copy by its Id (eid)

  const type = nodeById.type; // Get the node's type
  // When we copy, we need to create it above the old one (translate +50 x y)
  const position = {
    ...nodeById.position,
    x: nodeById.position.x + 50,
    y: nodeById.position.y - 50,
  };

  // Create a new message in the store
  store.$patch((state) => {
    const currentMessage = state.layers.messages.filter(
      (item) => item.id === eid
    ); // Get all the old message info

    state.layers.messages = [
      ...state.layers.messages,
      {
        ...JSON.parse(JSON.stringify(currentMessage))[0], // The element is copied by reference do we need to dereference it
        id: type + id,
      },
    ];
  });

  addNodes([
    {
      id: type + id,
      type,
      position,
      label: `${type} node`,
    },
  ]);
};

export {
  createVueNode,
  copyVueNode
};
