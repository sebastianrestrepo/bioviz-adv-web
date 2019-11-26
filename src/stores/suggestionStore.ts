import { observable, action } from 'mobx';

class SuggestionStore {

    @observable actualSampleDataLabeling: any;
    @observable anchicayaSuggestions = [
        {
            index:1,
            startTime: 15,
            endTime: 19,
            maxFreq: 4000,
            minFreq: 2000,
            date: '18 Junio 2019',
            hour: '6:35',
            time: 'AM',
            audio:'./assets/tagging-section/timeline-suggestion/filteredHafferia.wav',
            specImg: './assets/tagging-section/timeline-suggestion/filteredhafferia.png',
            sugOpen: false,
            suggestions: [
                {
                    sciName: 'Hafferia zeledoni',
                    commonName: 'Hormiguero de Zeledón',
                    order: 'Passeriformes',
                    family: 'Thamnophilidae',
                    percentage: 99,
                    mainAudioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72880',
                    spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72880/poster',
                    birdPhotoUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/121699541/1200',
                    owner: 'David L. Ross, Jr.',
                    location: 'Alajuela, Costa Rica',
                    url: 'https://macaulaylibrary.org/asset/72880',
                    isPlaying: false,
                    otherSongs: [
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72896',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72896/poster',
                            location: 'Alajuela, Costa Rica',
                            owner: 'David L. Ross, Jr.',
                            url: 'https://macaulaylibrary.org/asset/72896',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/73917751',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/73917751/poster',
                            location: 'Puntarenas, Costa Rica',
                            owner: 'Will Sweet',
                            url: 'https://macaulaylibrary.org/asset/73917751',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/80799',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/80799/poster',
                            location: 'Cañar, Ecuador',
                            url: 'https://macaulaylibrary.org/asset/80799',
                            owner: 'Ted Parker',
                            isPlaying: false
                        }
                    ]
                }, 
                {
                    sciName: 'Hafferia fortis',
                    commonName: 'Hormiguero Tiznado',
                    order: 'Passeriformes',
                    family: 'Thamnophilidae',
                    percentage: 87,
                    mainAudioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/243173',
                    spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/243173/poster',
                    birdPhotoUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/172768691/1800',
                    owner: 'Niels Krabbe',
                    location: 'Orellana, Ecuador',
                    url: 'https://macaulaylibrary.org/asset/243173',
                    isPlaying: false,
                    otherSongs: [ 
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/34338',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/34338/poster',
                            location: 'Loreto, Peru',
                            owner: 'Gregory Budney',
                            url: 'https://macaulaylibrary.org/asset/34338',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/29174',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/29174/poster',
                            location: 'Loreto, Peru',
                            owner: 'Ted Parker',
                            url: 'https://macaulaylibrary.org/asset/29174',
                            isPlaying: false
                        },
                    ]
                }
            ]
        },
        {
            index:2,
            startTime: 16,
            endTime: 19,
            maxFreq: 8000,
            minFreq: 4000,
            date: '18 Junio 2019',
            hour: '6:35',
            time: 'AM',
            audio:'./assets/tagging-section/timeline-suggestion/filteredSipia.wav',
            specImg: './assets/tagging-section/timeline-suggestion/filteredsipia.png',
            sugOpen: false,
            suggestions: [
                {
                    sciName: 'Sipia nigricauda',
                    commonName: 'Hormiguero de Esmeraldas',
                    order: 'Passeriformes',
                    family: 'Thamnophilidae',
                    percentage: 98,
                    mainAudioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/47328',
                    spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/47328/poster',
                    birdPhotoUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/159809471/1200',
                    owner: 'Bret Whitney',
                    location: 'El Oro, Ecuador',
                    url: 'https://macaulaylibrary.org/asset/47328',
                    isPlaying: false,
                    otherSongs: [
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/82413',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/82413/poster',
                            location: 'Cañar, Ecuador',
                            owner: 'Ted Parker',
                            url: 'https://macaulaylibrary.org/asset/82413',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/47813801',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/47813801/poster',
                            location: 'Pichincha, Ecuador',
                            owner: 'Andrew Spencer',
                            url: 'https://macaulaylibrary.org/asset/47813801',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/179634651',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/179634651/poster',
                            location: 'Pichincha, Ecuador',
                            url: 'https://macaulaylibrary.org/asset/179634651',
                            owner: 'Julia Wittmann',
                            isPlaying: false
                        }
                    ]
                }, 
                {
                    sciName: 'Sipia berlepschi',
                    commonName: 'Hormiguero Colimocho',
                    order: 'Passeriformes',
                    family: 'Thamnophilidae',
                    percentage: 89,
                    mainAudioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/139069',
                    spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/139069/poster',
                    birdPhotoUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/159810051/1800',
                    owner: 'Linda Macaulay',
                    location: 'Ecuador',
                    url: 'https://macaulaylibrary.org/asset/139069',
                    isPlaying: false,
                    otherSongs: [ 
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/31412211',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/31412211/poster',
                            location: 'Esmeraldas, Ecuador',
                            owner: 'Andrew Spencer',
                            url: 'https://macaulaylibrary.org/asset/31412211',
                            isPlaying: false
                        },
                        {
                            audioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/106329641',
                            spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/106329641/poster',
                            location: 'Valle del Cauca, Colombia',
                            owner: 'Edwin Munera',
                            url: 'https://macaulaylibrary.org/asset/106329641',
                            isPlaying: false
                        }
                    ]
                }
            ]
        }
    ]

    @observable speciesSuggested = [
        {
            sciName: 'Sipia berlepschi',
            commonName: 'Hormiguero Colimocho',
            order: 'Passeriformes',
            family: 'Thamnophilidae',
            gender: 'Sipia',
            coincidence: 89,
            mainAudioUrl: '//www.xeno-canto.org/sounds/uploaded/FPAGKPAQYO/XC428690-Stub-tailed%20Antbird_SanCipriano_Co_1sep2017_FSchmitt.mp3',
            spectroImgUrl: './assets/tagging-section/ai/colimocho-spec.jpg',
            birdPhotoUrl: './assets/birds/sipiaberlepschi.jpg',
            otherSongs: [
                {
                    audioUrl: '//www.xeno-canto.org/sounds/uploaded/BSFIBFUGKW/XC405735-Stub_tailed_Antbird_Anchicay%C3%A1_20171127_172446.mp3',
                    spectroImgUrl: './assets/tagging-section/ai/colimocho-spec-2.jpg',
                    location: 'Buenaventura, Colombia',
                    owner: 'Iván Lau'
                },
                {
                    audioUrl: '//www.xeno-canto.org/sounds/uploaded/UZXDJEAXMH/XC262105-61.085.02.Stub-tailed_Antbird.mp3',
                    spectroImgUrl: './assets/tagging-section/ai/colimocho-spec-3.jpg',
                    location: 'Esmeraldas, Ecuador',
                    owner: 'Olaf Jahn'
                },
                {
                    audioUrl: '//www.xeno-canto.org/sounds/uploaded/CLKPHLYUHA/MyrBer3IV.mp3',
                    spectroImgUrl: './assets/tagging-section/ai/colimocho-spec-4.jpg',
                    location: 'Nariño, Colombia',
                    owner: 'Todd Mark'
                }
            ]
        }
    ];

    //------------------TIMELINE SUGGESTION-----------------
    @observable isSampleSuggestionsOn = false;

    @action onSampleSugDisplay() {
        this.isSampleSuggestionsOn = !this.isSampleSuggestionsOn;
    }

    @observable suggestionsArray = [
        {
            percentage: 87,
            commonName: 'Hormiguero colimocho',
            scientificName: 'Sipia berlepschi',
            coincidences: '2 AUDIOS SIMILARES ENCONTRADOS',
            color: '#53D470',
            spectrogramImg: './assets/sipiaberlepschi.png',
            birdPhoto: './assets/birds-photos/sipiaberlepschi.png',
            audio: './assets/audio-samples/Atom2B/sipiaberlepschi.mp3'
        },
        {
            percentage: 81,
            commonName: 'Hormiguero de zeledón',
            scientificName: 'Sipia nigricauda',
            coincidences: '3 AUDIOS SIMILARES ENCONTRADOS',
            color: '#53D470',
            spectrogramImg: './assets/atom2B-/sipianigricauda.png',
            birdPhoto: './assets/birds-photos/sipianigricauda.png',
            audio: './assets/audio-samples/Atom2B/sipianigricauda.wav'
        },
        {
            percentage: 61,
            commonName: 'Homiguero guardarribera',
            scientificName: 'Sipia palliata',
            coincidences: '1 AUDIO SIMILAR ENCONTRADO',
            color: '#B8D449',
            spectrogramImg: './assets/sipiapalliata.png',
            birdPhoto: './assets/birds-photos/sipiapalliata.png',
            audio: './assets/audio-samples/Atom2B/sipiapalliata.mp3'
        },
        {
            percentage: 30,
            commonName: 'Hormiguero cuerniblanco',
            scientificName: 'Pithys albifrons',
            coincidences: '1 AUDIO SIMILAR ENCONTRADO',
            color: '#FAC22B',
            spectrogramImg: './assets/pithysalbifrons.png',
            birdPhoto: './assets/birds-photos/pithysalbifrons.png',
            audio: './assets/audio-samples/Atom2B/pithysalbifrons.mp3'
        }]


}

export const suggestionStore = new SuggestionStore();