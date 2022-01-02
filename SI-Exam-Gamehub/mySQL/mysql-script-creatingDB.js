const mysql = require("mysql");

const dotenv = require("dotenv");

dotenv.config({path: '../.env'});

const connection = mysql.createConnection({
    host     : process.env.DB_CONNECTION_URL,
    user     : process.env.DB_CONNECTION_USER,
    password : process.env.DB_CONNECTION_PASSWORD,
    database : process.env.DB_NAME
});

connection.connect(function (error) {
    if (error) console.log('Connection failed.' + error);
    console.log('Connection succesful.');

    // Opret et table kaldet 'users'

    const users_table =
        'CREATE TABLE IF NOT EXISTS users ' +
        '(' +
        'user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
        'username VARCHAR(45) NOT NULL UNIQUE, ' +
        '`password` VARCHAR(300) NOT NULL, ' +
        'firstname VARCHAR(45) NOT NULL, ' +
        'lastname VARCHAR(75) NOT NULL, ' +
        'phone_number INT UNIQUE, ' +
        'gender VARCHAR(15), ' +
        'birthdate VARCHAR(10) NOT NULL, ' +
        'email VARCHAR(100) NOT NULL UNIQUE, ' +
        'user_level VARCHAR(5) NOT NULL,' +
        'reset_key VARCHAR(50)' +
        ')';
    connection.query(users_table, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Opret et table kaldet 'games'

    const games_table =
        'CREATE TABLE IF NOT EXISTS games ' +
        '(' +
        'game_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
        'name VARCHAR(50) NOT NULL UNIQUE, ' +
        'picture_url VARCHAR(500) NOT NULL, ' +
        'developers VARCHAR(50) NOT NULL, ' +
        'genre VARCHAR(50) NOT NULL, ' +
        'platform VARCHAR(100) NOT NULL, ' +
        'release_date VARCHAR(15) NOT NULL, ' +
        'resume VARCHAR(1000) NOT NULL' +
        ');';
    connection.query(games_table, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Opret et table kaldet 'reviews'

    const reviews =
        'CREATE TABLE IF NOT EXISTS reviews ' +
        '(' +
        'review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
        'score INT NOT NULL, ' +
        'comment VARCHAR(5000) NOT NULL, ' +
        'user_fk_id INT UNSIGNED NOT NULL, ' +
        'game_fk_id INT UNSIGNED NOT NULL, ' +
        'FOREIGN KEY (user_fk_id) REFERENCES users (user_id) ON DELETE CASCADE,' +
        'FOREIGN KEY (game_fk_id) REFERENCES games (game_id) ON DELETE CASCADE' +
        ');';
    connection.query(reviews, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Indsæt data i 'users'

    const user_data =
        'INSERT INTO gamehub.users ' +
        '(username, `password`, firstname, lastname, phone_number, gender, birthdate, email, user_level) ' +
        'VALUES ' +
        '("Shawk", "$2b$10$DNMi3VllzacleqICBWEIG.JS4pcIqZ/rpYn8XsT3rJ4THjT4HuWGy", "Martin", "Holmqvist", 61686462, "male", "1984-08-10", "mart44f7@stud.kea.dk", "admin"), ' +
        '("Kopak", "$2b$10$kdE5/XyCTejb/D9yJD46aehpXfiDthRYEbvhV651g38nrCiwl.rpK", "Nicholas", "Tureczek", 27340399, "male", "1989-09-30", "nich4231@stud.kea.dk", "admin"), ' +
        '("Cykelhornet", "$2b$10$cM06F7R4OIAzxpbnSpx0zOs19qQi4BhF8jmieCxdZVFwaeLh45v6S", "Patrick", "Jønnson", 28582392, "male", "1999-04-18", "patr5152@stud.kea.dk", "admin"), ' +
        '("Tester1", "$2b$10$LxSjxWxHnLuYX2bL8Kj9HO8cmQBAkm39THpADEZuBoNKWEqV9wRL2", "Test 1", "Bruger 1", 53452333, "female", "2000-01-01", "test1@stud.kea.dk", "user"), ' +
        '("Tester2", "$2b$10$LxSjxWxHnLuYX2bL8Kj9HO8cmQBAkm39THpADEZuBoDFWEqV9wRL2", "Test 2", "Bruger 2", 34534533, "male", "2001-02-04", "test2@stud.kea.dk", "user"), ' +
        '("Tester3", "$2b$10$LxSjxWxHnLuYX2bL8Kj9HO8cmQBAkm39THpADEZuBoEDSEqV9wRL2", "Test 3", "Bruger 3", 12345678, "female", "1997-05-01", "test3@stud.kea.dk", "user");';

    connection.query(user_data, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Indsæt data i 'games'

    const games_data =
        'INSERT INTO gamehub.games ' +
        '(name, picture_url, developers, genre, platform, release_date, resume) ' +
        'VALUES ' +
        '("Cyberpunk 2077", "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.WqA8~2eefa/w:350/h:350/q:75/rt:fill/g:ce/ht' +
        'tps://bleedingcool.com/wp-content/uploads/2020/10/Cyberpunk-2077-Google-Stadia.jpg", "CD Projekt Red ' +
        'Studio", "Action, Role Playing Game", "PC, XONE, PS4, STA", "10-12-2020", "Cyberpunk 2077 is an open-' +
        'world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body' +
        ' modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to' +
        ' immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast' +
        ' city where the choices you make shape the story and the world around you."), ' +
        '("Desperados III", "https://image.api.playstation.com/vulcan/img/cfn/11307q0k3sbv98YWpRop-6Tcl5sHJSy9tqcFFjA' +
        'AiCok8lOs90RYikGrme9PajUjVKR7lSX6WJhTzg_O7eOBHtkjO1w_BjC4.png", "Mimimi Productions", "Real time Strat' +
        'egy", "PS4, XONE, PC, LNX & MAC", "16-06-2020", "The story follows bounty hunter John Cooper as he purs' +
        'ues Frank, a notorious bandit leader responsible for killing John\'s father, James Cooper. Along the way' +
        ', Cooper meets Doctor McCoy, who was hired by the DeVitt Company, a wealthy corporation, to defend the ' +
        'train Cooper was taking on his way to the town of Flagstone."), ' +
        '("Red Dead Redemption II", "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6S' +
        'DB5Jl4oBSq.png", "Rockstar Games", "Adventure, Action", "PS4, XONE, PC, STA", "26-10-2018", "After a b' +
        'otched ferry heist in 1899, the Van der Linde gang are forced to leave their substantial money stash and' +
        ' flee Blackwater. Realizing the progress of civilization is ending the time of outlaws, they decide to' +
        ' gain enough money to escape the law and retire."), ' +
        `("Sid Meier's Civilization VI", "https://cdn02.nintendo-europe.com/media/images/11_square_images/games_18/` +
        'nintendo_switch_5/SQ_NSwitch_SidMeiersCivilizationVI.jpg", "Firaxis Games", "Strategy, Turn-Based", "PC, MAC' +
        ', LNX, PS4, XONE", "20-10-2016", "Originally created by legendary game designer Sid Meier, Civilization is ' +
        'a turn-based strategy game in which you attempt to build an empire to stand the test of time. Explore a new ' +
        'land, research technology, conquer your enemies, and go head-to-head with history’s most renowned leaders as' +
        ' you attempt to build the greatest civilization the world has ever known."), ' +
        `("Assassin's Creed Valhalla", "https://image.api.playstation.com/vulcan/ap/rnd/202008/1318/8XGEPtD1xoasK0FY` +
        'kYNcCn1z.png", "Ubisoft Montreal", "Action, Adventure", "PS4, XONE, PS5, XBSX, PC", "10-11-2020' +
        '", "Set in 873 AD, the game recounts a fictional story during the Viking invasion of Britain. The playe' +
        'r controls Eivor, a Viking raider who becomes embroiled in the conflict between the Brotherhood of Assa' +
        'ssins and the Templar Order."), ' +
        '("South Park: The Stick of Truth", "https://image.api.playstation.com/cdn/UP0001/CUSA04768_00/z4hPg2i1Gdm09' +
        'eBu4RQDMCbzYd0wmvCK.png", "Obsidian Entertainment, Ubisoft", "Role-Playing", "PS3, X360, PC, PS4, XONE,' +
        ' NS", "04-03-2014", "Since the ancient times, the human barbarians of the Kingdom of Kupa Keep (KKK) and' +
        ' their leader, the brave and awesome Grand Wizard King, have waged war with the Drow Elves for possess' +
        'ion of the Stick of Truth, an artifact seeped in legend that is foretold to give they who possess it to' +
        'tal control of the universe. As foretold by Caldwell Banker, the New Kid in town has moved to town with' +
        ' their parents to get away from their dark and dangerous past. To keep their mind away from their prob' +
        `lems, the New Kid's parents send them out to make some new friends."), ` +
        '("South Park: The Fractured But Whole", "https://image.api.playstation.com/cdn/EP0001/CUSA04323_00/6hSSZPKL' +
        'gHQFEOTg1k1ocVNzBB9YGRCP.png", "Ubisoft San Francisco", "Role-Playing", "PS4, XONE, PC, NS", "01-10-2017' +
        '", "South Park: The Fractured But Whole takes place in the Rocky Mountains of Colorado. As the game be' +
        'gins, The Coon (Eric Cartman) is at a table in the Coon Lair where he and friends are dressed as super' +
        `heroes. The Coon has planned out the group's film franchise and is explaining it to the group. Argumen` +
        'ts ensue and the group is split in two. One group becomes Coon and Friends while the now opposing group ' +
        'calls themselves Freedom Pals, led by Doctor Timothy (Timmy Burch). The Freedom Pals demand their own ' +
        `franchise and a 'civil war' between the two superhero group begins."), ` +
        '("Starcraft II: Wings of Liberty", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/39ca4f85-d68' +
        '4-44f9-8def-f1c97d6ee63b/d4oncr2-14c8b70d-e91a-4302-94cd-0b5ce4128239.png?token=eyJ0eXAiOiJKV1QiLCJhbGci' +
        'OiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzljYTRmODUtZDY' +
        '4NC00NGY5LThkZWYtZjFjOTdkNmVlNjNiXC9kNG9uY3IyLTE0YzhiNzBkLWU5MWEtNDMwMi05NGNkLTBiNWNlNDEyODIzOS5wbmcifV1' +
        'dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.z9i3hW7_RGv-WoMzVkLmMAfx7EBNckNHJGC90XEBWh4", "Bliz' +
        'zard Entertainment", "Strategy, Real-Time", "PC, MAC", "27-07-2010", "Following the events of Wings of ' +
        'Liberty, Terran Dominion forces attack Sarah Kerrigan and her allies in a research facility in the terri' +
        `tory of the Umojan Protectorate. Kerrigan and other residents escape to the flagship of Raynor's Raider` +
        's, the Hyperion, but Commander Jim Raynor is cut off by the Dominion. The Hyperion escapes, but Kerrig' +
        'an remains behind to locate Raynor, only to hear a Dominion newscast announcing that he has been capture' +
        'd and executed. Enraged, Kerrigan returns to Zerg territory to retake control of the swarm and overthrow' +
        ' the tyrannical Dominion."), ' +
        '("Neverwinter Nights", "https://www.mobygames.com/images/covers/l/613018-neverwinter-nights-enhanced-edi' +
        'tion-playstation-4-front-cover.jpg", "Beamdog, Overhaul Games, Ossian Studios, BioWare", "Role-Playing", ' +
        '"PC, MAC, IOS, LNX, AND, PS4, XONE, NS", "12-06-2002", "The story begins in 1372 DR with the player character' +
        ' being sent by Lady Aribeth to recover four monsters needed to make a cure for the Wailing Death, a plague' +
        ' that is sweeping the city of Neverwinter. With the help of Fenthick Moss, Aribeth’s love interest, and Des' +
        'ther, Fenthick’s friend, the player character is able to retrieve the monsters. As he is collecting these ' +
        'monsters, he is attacked by mysterious assassins from the cult that is behind the spreading of the plague. ' +
        'As the cure is being made, Castle Neverwinter is attacked by Desther’s minions. He takes the completed cure' +
        ' and escapes the castle, with the player character and Fenthick in pursuit. When they catch up to Desther,' +
        ' he surrenders after a short battle. Desther is sentenced to burn at the stake, and Fenthick, despite being' +
        ' unaware of Desther’s true intentions, is sentenced to hang.") ';

    connection.query(games_data, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Indsæt data i 'reviews'

    const reviews_data =
        'INSERT INTO gamehub.reviews ' +
        '(score, comment, user_fk_id, game_fk_id) ' +
        'VALUES ' +
        '("9", "Rigtig fedt fremtids RPG shooter!", 1, 1), ' +
        '("8", "Super spil!", 1, 2), ' +
        '("9", "Rigtig fedt koboider spil!", 1, 3), ' +
        '("10", "Mega fedt spil!", 2, 1), ' +
        '("7", "Ganske fint spil!", 2, 2), ' +
        '("8", "God underholdning med vild grafiske effekter!", 2, 3), ' +
        '("9", "Virker super fedt...!", 3, 1), ' +
        '("9", "Coooooooooooooooool!", 3, 2), ' +
        '("10", "Cowboys i det vilde vesten, jiiihaaaw!", 3, 3), ' +
        '("7", "Udemærket, men lidt for mange bugs!", 4, 1), ' +
        '("6", "Ganske underholdende, men lidt for ensformigt i længden..", 4, 6), ' +
        '("10", "Klassiker! Genial produktion!", 5, 9), ' +
        '("9", "Et spil man bare ALDRIG bliver træt af!", 6, 8), ' +
        '("9", "Elsker hele South Park universet", 5, 6), ' +
        '("8", "God efterfølger til 1´eren!", 5, 7);';

    connection.query(reviews_data, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });

    // Bruges til at slette tables inklusiv indhold.
    /*
    const delete_tables = 'DROP TABLE reviews, users, games;';

    connection.query(delete_tables, function (error, result) {
        if (error) console.log(error);
        console.log(result);
    });
    */

    connection.end();
});
