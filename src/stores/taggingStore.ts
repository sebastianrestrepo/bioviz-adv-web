import { observable, autorun, action } from 'mobx';

class TaggingStore {

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

const taggingStore = new TaggingStore();

export default taggingStore;