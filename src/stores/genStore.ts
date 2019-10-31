import { observable, action } from "mobx";


class GenStore {

    @observable isDashOpen = false;
    @observable isHomeActive = true;
    @observable isProjectsActive = false;

    @observable navBarTitle = 'Inicio'
    @action openDash() {
        this.isDashOpen = !this.isDashOpen;
    }

    @action onDahshNavClick(section) {
        switch (section) {
            case 'home':
                this.isHomeActive = true;
                this.isProjectsActive = false
                this.navBarTitle = 'Inicio'
                break;
            case 'projects':
                this.isHomeActive = false;
                this.isProjectsActive = true
                this.navBarTitle = 'Proyectos'
                break;
        }
    }


}
const genStore = new GenStore();

export default genStore;