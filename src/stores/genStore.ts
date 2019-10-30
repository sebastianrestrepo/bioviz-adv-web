import { observable, action } from "mobx";


class GenStore {

    @observable isDashOpen = false;

    @action openDash() {
        this.isDashOpen = !this.isDashOpen;
    }

}
const genStore = new GenStore();

export default genStore;