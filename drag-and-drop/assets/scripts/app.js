class DraggableItems {
    constructor(draggable) {
        this.createDraggableItems(draggable);
    }

    createDraggableItems = (draggable) => {
        for (let item of draggable) {
            item.addEventListener('dragstart', (event) => {
                console.log('Drag Start');
                event.dataTransfer.setData('text/html', event.target.id);
                event.dataTransfer.dropEffect = 'all';
            });
        }
    };
}

class DropContainer {
    constructor(dropContainer) {
        this.createDragOverEvent(dropContainer);
        this.createDropEvent(dropContainer);
    }
    createDragOverEvent = (dropContainer) => {
        dropContainer.addEventListener('dragover', (event) => {
            console.log('DragOver');
            event.preventDefault();
        });
    };

    createDropEvent = (dropContainer) => {
        dropContainer.addEventListener('drop', (event) => {
            console.log('Drop');
            event.preventDefault();
            const data = event.dataTransfer.getData('text/html');
            if (data !== '') {
                let nodeCopy = document.getElementById(data).cloneNode(true);
                nodeCopy.id = this.createRandomID();
                dropContainer.append(nodeCopy);
            }
        });
    };

    createRandomID = () => '_' + Math.random().toString(36).substr(2, 9);
}

class DropContainerChangeColor extends DropContainer {
    constructor(dropContainer) {
        super(dropContainer);
        this.changeBackgroundColorEvent(dropContainer);
    }
    changeBackgroundColorEvent = (dropContainer) => {
        dropContainer.addEventListener('drop', (event) => {
            console.log('Dragend');
            dropContainer.style.background = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
        });
    };
}

class App {
    static init() {
        const draggableItem = document.getElementsByClassName('draggable__item');
        const draggableItemInstance = new DraggableItems(draggableItem);

        const dropContainer = document.getElementById('drop__container');
        const DropContainerInstance = new DropContainer(dropContainer);
        
        const dropContainer2 = document.getElementById('drop__container--second');
        const dropContainer2Instance = new DropContainerChangeColor(dropContainer2);
    }
}

App.init();
