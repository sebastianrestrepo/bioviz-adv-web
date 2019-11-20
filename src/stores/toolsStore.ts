import { observable, autorun, action } from 'mobx';

class ToolsStore {

    @observable wsRef: any;

    constructor() {
    }

    @action handlePlay = () => {
        this.wsRef.play();
    }

    @action handlePause = () => {
        this.wsRef.pause();
    }

}

const toolsStore = new ToolsStore();

export default toolsStore;