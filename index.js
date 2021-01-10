//loading necessary packages
const readlineSync = require("readline-sync");
const chalk = require("chalk");
const gradient = require("gradient-string");
const figlet = require("figlet");

//Defining color scheme: Chalk, gradient packages used
var colorScheme = {
	head: gradient.cristal,
	tag: gradient.teen,
	play: chalk.bold.red.bgWhite,
	query: gradient.instagram,
	options: chalk.gray,
	score: gradient.passion,
	highScore: gradient.pastel
};

//variables to store quiz stats
let scores = []
let highScore = 0;
let visitCount = 0;

//question set for the quiz
let questionsEasy = [{
	query: "What command is used to count the total number of lines, words, and characters contained in a file?",
	options: ["countw", "wcount", "wc", "count p"],
	answer: "wc",
	explain: "wc -l A to count the no of lines in file.\nwc -c to count the no characters in the file.\nwc -w to count the no of words in the file."
}, {
	query: "What command is used to remove files?",
	options: ["dm", "rm", "delete", "erase"],
	answer: "rm",
	explain: "rm is a command to remove files. rm -r is used to remove a directory."
}, {
	query: "What command is used with vi editor to delete a single character?",
	options: ["x", "y", "a", "z"],
	answer: "x",
	explain: "x delete single character under the cursor, Nx delete N characters, starting with character under cursor, dw delete the single word beginning with a character under the cursor, dNw delete N words beginning with character under cursor"
}, {
	query: "What hardware architectures are not supported by Red Hat?",
	options: ["SPARC", "IBM-compatible", "Alpha", "Macintosh"],
	answer: "Macintosh",
	explain: "Macintosh is apple base hardware which does not allowed any other OS to be installed other than mac."
}, {
	query: "Which of the following command can you execute to count the number of lines in a file?",
	options: ["lc", "wc - l", "cl", "count"],
	answer: "wc -l",
	explain: "wc is used for word count which will result all the details like number of words line numbers and -l specifies that we only want the line count."
}, {
	query: "What command is used to display the characteristics of a process?",
	options: ["au", "ps", "du", "pid"],
	answer: "ps",
	explain: "Refer man page for ps"
}, {
	query: "What command is used with vi editor to save file and remain in the editing mode?",
	options: ["x", "q!", ":w", ":q"],
	answer: ":w",
	explain: ":w is used for writing and saving the file."
}, {
	query: "What does GNU stand for?",
	options: ["GNU's not Unix", "Greek Needed Unix", "General Unix","General Noble Unix"],
	answer: "GNU's not Unix	",
	explain: "GNU's not unix is a unix like operating system Developed by the GNU Project. It differs from unix by being free software and contains no unix code."
}];

let questionsHard = [{
	query: "What command is used to sort the lines of data in a file in reverse order?",
	options: ["sort - r", "st", "sh", "sort"],
	answer: "sort -r",
	explain:"Check man page of sort command for more info."
}, {
	query: "What command is used to print a file?",
	options: ["lp", "pg", "prn", "print"],
	answer: "lp",
	explain:"The lp command is used to print files on Unix and Linux systems. The name 'lp' stands for 'line printer'."
}, {
	query: "The command chmod 761 letter is equivalent to",
	options: ["chmod 4=7, g = 6, o = 1 letter", "chmod a = 761 letter", "chmod u = rwx, g = rw, o = x letter", "chmod 167 letter"],
	answer: "chmod u = rwx, g = rw, o = x letter",
	explain:"7 6 1 :: 111 110 001 (octal format).\nrwx rw---x, where, \nr:Read\tw:Write\tx:Execute"
}, {
	query: "What command is used with vi editor to move forward to the end of a word?",
	options: ["c", "d", "b", "e"],
	answer: "e",
	explain:"e ~ end of word"
}, {
	query: "What command is used with vi editor to delete three words?",
	options: ["3$d", "3 dw", "3 x", "3 dd"],
	answer: "3 dw",
	explain:"Dw cmd used for delete words from a file where dd command used for delete line from the file."
}, {
	query: "What TCP/IP protocol is used for file transfer with minimal capability and minimal overhead?",
	options: ["TELNET", "TFTP", "FTP", "RARP"],
	answer: "TFTP",
	explain:"TFTP (Trivial File Transfer Protocol) The TCP/IP standard protocol for file transfer with minimal capability and minimal overhead. TFTP depends on the connection-less data-gram delivery service, UDP. Thin Ethernet An 802.3 LAN that uses smaller than normal diameter coaxial cable; often used to link PCs together."
}, {
	query: "GNOME is based on",
	options: ["CORBA toolkit", "COM/DCOM toolkit", "ORE toolkit", "OLE DB toolkit"],
	answer: "CORBA toolkit",
	explain:"CORBA (Common Object Request Broker Architecture) is a support framework of applications, libraries and services for making distributed procedure calls."
}, {
	query: "What can he used to set up a firewall on a Linux system?",
	options: ["netstat", "route", "trace", "ipchains"],
	answer: "ipchains",
	explain:"Linux IP Firewalling Chains, normally called ipchains, is free software to control the packet filter or firewall capabilities in the 2.2 series of Linux kernels. And the ipchains software was superseded by the iptables system in Linux kernel."
}];


function readInput(prompt) {
	//function to read input from console
	return readlineSync.question(prompt);
}

function writeOutput(message) {
	//function to write output to console
	console.log(message);
}

function displayScores(total) {
	//Display user score, high score and leader board
	let userScore = scores[scores.length-1];
	writeOutput(colorScheme.score("\nYour score: " + userScore + "/"+total));

	if(userScore >= highScore) {
		highScore = userScore;
		writeOutput(colorScheme.highScore("You have the highest score among "+(visitCount-1)+" other people who also took the quiz!"));
	}

	writeOutput(colorScheme.score("UserID\tScore"));
	for(let i=0; i<scores.length; i++) {
		writeOutput(colorScheme.score(i + "\t\t" + scores[i]));
	}
}


function quiz(questions) {

	writeOutput(colorScheme.head(figlet.textSync('LinuxQuiz!', {
    horizontalLayout: 'full',
	})));
	writeOutput(colorScheme.tag("\nMay the source be with you.\n"));

	let play = true;

	//Option to continue or exit
	while(play) {
		play = readlineSync.keyInYN(colorScheme.play('\nDo you want to play?'));

		if( play === false || play === "") {
			console.log(colorScheme.play('K. Bye.'));
			return;
		}

		writeOutput(colorScheme.head("\nLet's start!\n"));
		console.log(colorScheme.play("\nYour user ID:" + visitCount));
		scores.push(0);
		visitCount++;
		for(let i=0; i<questions.length; i++) {
			let index = readlineSync.keyInSelect(questions[i].options, colorScheme.query(questions[i].query), {cancel:"Skip this question"});

			if(questions[i].options[index] === questions[i].answer) {
				writeOutput("Correct!");
				scores[scores.length-1]++;
			}
			else {
				writeOutput(colorScheme.play("Wrong! It's "+ questions[i].answer));
				writeOutput(colorScheme.options(questions[i].explain));
			}
			writeOutput("------------------------------------------");
		}

		displayScores(questions.length);
	}
}

quiz(questionsEasy);


	


