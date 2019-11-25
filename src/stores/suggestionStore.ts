import { observable, action } from 'mobx';

class SuggestionStore {

    @observable anchicayaSuggestions = [
        {
            startTime: 16,
            endTime: 19,
            maxFreq: 4000,
            minFreq: 2000,
            date: '18 Junio 2019',
            hour: '6:35',
            time: 'AM',
            suggestions: [
                {
                    sciName: 'Hafferia zeledoni',
                    commonName: 'Hormiguero de Zeledón',
                    order: 'Passeriformes',
                    family: 'Thamnophilidae',
                    percentage: 99,
                    mainAudioUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72880',
                    spectroImgUrl: 'https://download.ams.birds.cornell.edu/api/v1/asset/72880/poster',
                    birdPhotoUrl: './assets/birds/sipiaberlepschi.jpg',
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
                    otherSongs: [ ]
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
            coincidence: 87,
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