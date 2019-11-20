import { observable, action } from "mobx";
import projectsStore from './projectsStore';


class GenStore {

    @observable isDashOpen = true;
    @observable isHomeActive = true;
    @observable isProjectsActive = false;
    @observable isNotificationsActive = false;
    @observable isListsActive = false;
    @observable isActualProjectActive = false;

    @observable navBarTitle = 'Inicio'
    @action openDash() {
        this.isDashOpen = !this.isDashOpen;
    }

    @action onDahshNavClick(section) {
        switch (section) {
            case 'home':
                this.isHomeActive = true;
                this.isProjectsActive = false
                this.isActualProjectActive = false
                this.navBarTitle = 'Inicio'
                projectsStore.actualProject = {}
                break;
            case 'projects':
                this.isHomeActive = false;
                this.isProjectsActive = true
                this.isActualProjectActive = false
                this.navBarTitle = 'Proyectos'
                projectsStore.actualProject = {}
                break;
            case 'actualproject':
                this.isHomeActive = false;
                this.isProjectsActive = false
                this.isActualProjectActive = true
                break;
        }
    }


}
const genStore = new GenStore();

export default genStore;