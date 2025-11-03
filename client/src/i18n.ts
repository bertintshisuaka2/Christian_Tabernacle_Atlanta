import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.staff": "Staff",
      "nav.sermons": "Sermons",
      "nav.events": "Events",
      "nav.prayer": "Prayer",
      "nav.contact": "Contact",
      "nav.give": "Give",
      "nav.admin": "Admin",
      "nav.logout": "Logout",
      "nav.signin": "Sign In",
      
      // Hero Section
      "hero.title": "Christian Tabernacle of Atlanta",
      "hero.subtitle": "Hebrews 13:8 'Jesus Christ is the same yesterday, today and forever'",
      "hero.learnMore": "Learn More",
      "hero.upcomingEvents": "Upcoming Events",
      
      // Service Times
      "service.title": "Service Times",
      "service.sunday": "Sunday Morning Worship",
      "service.saturday": "Saturday Evening Service",
      "service.sundayTime": "Sunday",
      "service.saturdayTime": "Saturday",
      "service.sundayDesc": "Join us for our main Sunday worship service with inspiring messages and fellowship.",
      "service.saturdayDesc": "Join us for our Saturday evening worship service.",
      
      // Choir Section
      "choir.title": "Discover Our Choir",
      "choir.videoTitle": "Christian Tabernacle of Atlanta Choir",
      
      // Events
      "events.title": "Upcoming Events",
      "events.viewAll": "View All",
      
      // Sermons
      "sermons.title": "Recent Sermons",
      "sermons.viewAll": "View All",
      
      // Call to Action
      "cta.title": "Join Us This Weekend",
      "cta.subtitle": "Saturday 6:00 PM - 8:00 PM | Sunday 10:00 AM - 1:00 PM",
      "cta.description": "Experience worship, community, and hope. Everyone is welcome.",
      "cta.planVisit": "Plan Your Visit",
      "cta.giveOnline": "Give Online",
      
      // Footer
      "footer.title": "Church Community Website",
      "footer.description": "A place of worship, fellowship, and community.",
      "footer.quickLinks": "Quick Links",
      "footer.getInvolved": "Get Involved",
      "footer.prayerRequests": "Prayer Requests",
      "footer.volunteer": "Volunteer",
      "footer.contactUs": "Contact Us",
      "footer.connect": "Connect",
      "footer.rights": "All rights reserved",
      
      // About Page
      "about.title": "About Us",
      "about.faithStatement": "The Holy Scripture is the only source and complete foundation of our faith, the only guideline in teaching and life. God through His prophets in the Old Testament and by the apostles in the New Testament has left with us all we need to know. The Bible contains the whole testimony of God whereunto nothing can be added like it is with a last will.",
      "about.apostolicTeaching": "Only what the apostles left behind in the New Testament is indeed »apostolic teaching«. Only what the Bible truly teaches is »biblical«. Only what originates with Christ Himself is »Christian«. Statements of faith declared at different councils in the course of church history are rejected as additions and forgery of the original Word.",
      "about.ministryTitle": "The Prophetic and Apostolic Ministry",
      "about.endTimeMessage": "The End Time Message",
      "about.branhamTitle": "William Branham and His Prophetic Ministry in the End-Time",
      "about.branhamText": "We claim to believe as the Holy Scripture says and acknowledge with thankful hearts that we are now living close to the second coming of Christ. We see Bible prophecies fulfilled as it was at His first coming. The New Testament began with the fulfilment of scriptural prophecies and ends the same way. The promise that a voice would cry in the wilderness (Isa. 40:3) and that the Lord would send His messenger to prepare His way (Mal. 3:1) became a living reality in the ministry of John the Baptist. This we find confirmed in Mt. 11:10; Mk. 1:1-4; Lk. 1:16-17; Jn. 1:19-28.",
      "about.frankTitle": "The Ministry of Matthew 24:45-47",
      "about.frankText": "We exhort you to pay attention to these ministries that God has raised up among His people, knowing that God does not repent of His gifts or His calling (Romans 11:29). But we do not want to stop at a particular ministry, or its representative, but we must take into consideration all the ministries of the Word that God has provided, serving for our perfection according to what is written in Ephesians 4, verses 11 to 15: \"And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers; For the perfecting of the saints, for the work of the ministry, for the edifying of the body of Christ: Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ: That we henceforth be no more children, tossed to and fro, and carried about with every wind of doctrine, by the sleight of men, and cunning craftiness, whereby they lie in wait to deceive; But speaking the truth in love, may grow up into him in all things, which is the head, even Christ.\"",
      "about.bibleTitle": "The Bible",
      "about.bibleText": "All Scripture is inspired by God and is useful to teach us what is true and to make us realize what is wrong in our lives. It corrects us when we are wrong and teaches us to do what is right.",
      
      // Staff Page
      "staff.title": "Our Pastors & Staff",
      "staff.subtitle": "Meet the dedicated leaders serving our church community",
      "staff.noStaff": "No staff members to display at this time.",
      "staff.brother": "Brother",
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.staff": "Personnel",
      "nav.sermons": "Sermons",
      "nav.events": "Événements",
      "nav.prayer": "Prière",
      "nav.contact": "Contact",
      "nav.give": "Donner",
      "nav.admin": "Admin",
      "nav.logout": "Déconnexion",
      "nav.signin": "Se connecter",
      
      // Hero Section
      "hero.title": "Tabernacle Chrétien d'Atlanta",
      "hero.subtitle": "Hébreux 13:8 'Jésus-Christ est le même hier, aujourd'hui et pour toujours'",
      "hero.learnMore": "En savoir plus",
      "hero.upcomingEvents": "Événements à venir",
      
      // Service Times
      "service.title": "Horaires des services",
      "service.sunday": "Culte du dimanche matin",
      "service.saturday": "Service du samedi soir",
      "service.sundayTime": "Dimanche",
      "service.saturdayTime": "Samedi",
      "service.sundayDesc": "Rejoignez-nous pour notre culte principal du dimanche avec des messages inspirants et de la communion fraternelle.",
      "service.saturdayDesc": "Rejoignez-nous pour notre service de culte du samedi soir.",
      
      // Choir Section
      "choir.title": "Découvrez notre chorale",
      "choir.videoTitle": "Chorale du Tabernacle Chrétien d'Atlanta",
      
      // Events
      "events.title": "Événements à venir",
      "events.viewAll": "Voir tout",
      
      // Sermons
      "sermons.title": "Sermons récents",
      "sermons.viewAll": "Voir tout",
      
      // Call to Action
      "cta.title": "Rejoignez-nous ce week-end",
      "cta.subtitle": "Samedi 18h00 - 20h00 | Dimanche 10h00 - 13h00",
      "cta.description": "Vivez l'adoration, la communauté et l'espoir. Tout le monde est le bienvenu.",
      "cta.planVisit": "Planifier votre visite",
      "cta.giveOnline": "Donner en ligne",
      
      // Footer
      "footer.title": "Site Web de la communauté ecclésiale",
      "footer.description": "Un lieu de culte, de communion fraternelle et de communauté.",
      "footer.quickLinks": "Liens rapides",
      "footer.getInvolved": "Participer",
      "footer.prayerRequests": "Demandes de prière",
      "footer.volunteer": "Bénévolat",
      "footer.contactUs": "Nous contacter",
      "footer.connect": "Se connecter",
      "footer.rights": "Tous droits réservés",
      
      // About Page
      "about.title": "À propos de nous",
      "about.faithStatement": "La Sainte Écriture est la seule source et le fondement complet de notre foi, la seule ligne directrice dans l'enseignement et la vie. Dieu, par ses prophètes dans l'Ancien Testament et par les apôtres dans le Nouveau Testament, nous a laissé tout ce que nous devons savoir. La Bible contient tout le témoignage de Dieu auquel rien ne peut être ajouté comme c'est le cas d'un testament.",
      "about.apostolicTeaching": "Seul ce que les apôtres ont laissé dans le Nouveau Testament est vraiment « enseignement apostolique ». Seul ce que la Bible enseigne vraiment est « biblique ». Seul ce qui vient du Christ lui-même est « chrétien ». Les déclarations de foi déclarées lors de différents conciles au cours de l'histoire de l'Église sont rejetées comme des ajouts et une falsification de la Parole originale.",
      "about.ministryTitle": "Le ministère prophétique et apostolique",
      "about.endTimeMessage": "Le message du temps de la fin",
      "about.branhamTitle": "William Branham et son ministère prophétique dans le temps de la fin",
      "about.branhamText": "Nous prétendons croire comme le dit la Sainte Écriture et reconnaissons avec des cœurs reconnaissants que nous vivons maintenant près du second avènement du Christ. Nous voyons les prophéties bibliques s'accomplir comme lors de sa première venue. Le Nouveau Testament a commencé par l'accomplissement de prophéties scripturaires et se termine de la même manière. La promesse qu'une voix crierait dans le désert (Ésaïe 40:3) et que le Seigneur enverrait son messager pour préparer son chemin (Malachie 3:1) est devenue une réalité vivante dans le ministère de Jean-Baptiste. Ceci nous le trouvons confirmé dans Mt. 11:10; Mc. 1:1-4; Lc. 1:16-17; Jn. 1:19-28.",
      "about.frankTitle": "Le ministère de Matthieu 24:45-47",
      "about.frankText": "Nous vous exhortons à prendre garde à ces ministères que Dieu a suscités parmi son peuple, en sachant que Dieu ne se repent pas de ses dons, ni de son appel (Romains 11:29). Mais nous ne voulons pas nous arrêter à un ministère particulier, ou à son représentant, mais nous devons prendre en considération tous les ministères de la Parole auxquels Dieu a pourvu, servant à notre perfectionnement selon ce qu'il est écrit dans Éphésiens 4, versets 11 à 15: \"Et il a donné les uns comme apôtres, les autres comme prophètes, les autres comme évangélistes, les autres comme pasteurs et docteurs, pour le perfectionnement des saints en vue de l'œuvre du ministère et de l'édification du corps de Christ, jusqu'à ce que nous soyons tous parvenus à l'unité de la foi et de la connaissance du Fils de Dieu, à l'état d'homme fait, à la mesure de la stature parfaite de Christ, afin que nous ne soyons plus des enfants, flottants et emportés à tout vent de doctrine, par la tromperie des hommes, par leur ruse dans les moyens de séduction, mais que, professant la vérité dans la charité, nous croissions à tous égards en celui qui est le chef, Christ.\"",
      "about.bibleTitle": "La Bible",
      "about.bibleText": "Toute l'Écriture est inspirée de Dieu et est utile pour nous enseigner ce qui est vrai et pour nous faire réaliser ce qui ne va pas dans nos vies. Elle nous corrige quand nous avons tort et nous enseigne à faire ce qui est juste.",
      
      // Staff Page
      "staff.title": "Nos pasteurs et personnel",
      "staff.subtitle": "Rencontrez les dirigeants dévoués qui servent notre communauté ecclésiale",
      "staff.noStaff": "Aucun membre du personnel à afficher pour le moment.",
      "staff.brother": "Frère",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

