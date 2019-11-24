import { observable } from 'mobx';

class SuggestionStore {
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

    @observable suggestionsArray = [
        {
            percentage: 87,
            commonName: 'Hormiguero colimocho',
            scientificName: 'Sipia berlepschi',
            coincidences: '2 AUDIOS SIMILARES ENCONTRADOS',
            color: '#53D470',
            spectrogramImg: './assets/atom2B-assets/sipiaberlepschi.png',
            birdPhoto: './assets/atom2B-assets/birds-photos/sipiaberlepschi.png',
            audio: './assets/audio-samples/Atom2B/sipiaberlepschi.mp3'
        },
        {
            percentage: 81,
            commonName: 'Hormiguero de zeledón',
            scientificName: 'Sipia nigricauda',
            coincidences: '3 AUDIOS SIMILARES ENCONTRADOS',
            color: '#53D470',
            spectrogramImg: './assets/atom2B-assets/sipianigricauda.png',
            birdPhoto: './assets/atom2B-assets/birds-photos/sipianigricauda.png',
            audio: './assets/audio-samples/Atom2B/sipianigricauda.wav'
        },
        {
            percentage: 61,
            commonName: 'Homiguero guardarribera',
            scientificName: 'Sipia palliata',
            coincidences: '1 AUDIO SIMILAR ENCONTRADO',
            color: '#B8D449',
            spectrogramImg: './assets/atom2B-assets/sipiapalliata.png',
            birdPhoto: './assets/atom2B-assets/birds-photos/sipiapalliata.png',
            audio: './assets/audio-samples/Atom2B/sipiapalliata.mp3'
        },
        {
            percentage: 30,
            commonName: 'Hormiguero cuerniblanco',
            scientificName: 'Pithys albifrons',
            coincidences: '1 AUDIO SIMILAR ENCONTRADO',
            color: '#FAC22B',
            spectrogramImg: './assets/atom2B-assets/pithysalbifrons.png',
            birdPhoto: './assets/atom2B-assets/birds-photos/pithysalbifrons.png',
            audio: './assets/audio-samples/Atom2B/pithysalbifrons.mp3'
        }]
   

}

export const suggestionStore = new SuggestionStore();