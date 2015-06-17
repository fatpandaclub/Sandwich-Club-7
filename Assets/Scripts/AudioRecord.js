#pragma strict

var gameControllerScript : GameController;

public var characters : GameObject[];
public var recordedSounds : AudioSource[];
public var materials : Material[];

public var recordingNumber : int = 0;

public var startStopRecButton : GameObject;
//public var stopRecButton : GameObject;
public var playRecButton : GameObject;
public var increaseRecButton : GameObject;

private var micName : String = "Built-in Microphone";
private var currentRecString = "Currently recording #";

private var increaseVisible : boolean = false;

var ranNum01 : int = 0;
var ranNum02 : int = 0;


function Start () {
}

function Update () {

	if(increaseVisible) {
		increaseRecButton.GetComponent.<UI.Button>().interactable = true;
	} else {
		increaseRecButton.GetComponent.<UI.Button>().interactable = false;
	}
}

function startStopRecording() {
	// If microphone is not recording, record
	if(!Microphone.IsRecording(micName)) {
		recordedSounds[recordingNumber].clip = Microphone.Start(micName, true, 2, 44100);
		startStopRecButton.Find("Text").GetComponent.<UI.Text>().text = "S T O P";
	} // Else end recording
	else {
		Microphone.End(micName);
		startStopRecButton.Find("Text").GetComponent.<UI.Text>().text = "R E C O R D";
		increaseVisible = true;
	}

}

function playRecording() {
	recordedSounds[recordingNumber].Play();
}

function increaseRecNumber() {
	
	var rend = characters[recordingNumber].GetComponent.<Renderer>();
	rend.enabled = true;

	if(recordingNumber < 6) {

		recordingNumber++;

		gameControllerScript.changeBG();

	}
	else {
		recordingNumber = 0;
		gameControllerScript.startCountdown();
	}

	increaseVisible = false;
}

