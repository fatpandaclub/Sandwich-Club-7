#pragma strict

var audioScript : AudioRecord;
var enemyScript : EnemyController;
var enemySpawnerScript : EnemySpawner;

public var background : GameObject;
public var whiteMaterial : Material;

var ranNum01 : int;
var ranNum02 : int;
var ranBgInt : int;

var haveWon : boolean = false;
public var haveLost : boolean = false;

public var endSong : AudioSource;

public var restartButton : GameObject;
public var restartWithButton : GameObject;

public var points : int = 0;

public var pointsText : UI.Text;

public var charactersPos : Transform[];

function Start () {
    changeBG();

    // Initiate charactersPos array
    charactersPos = new Transform[audioScript.characters.length];
    for(var i : int = 0; i < audioScript.characters.length; i++) {
        charactersPos[i] = audioScript.characters[i].transform;
    }
}

function Update () {
    if(haveWon) {
        for(var i : int = 0; i < audioScript.characters.length; i++) {
            if(i != ranNum01 && i != ranNum02) {
                audioScript.characters[i].SetActive(false);
            }
        }

        if (!endSong.isPlaying) {
            endSong.Play();
        }

        if(Random.Range(0, 10) > 5) {
            background.GetComponent.<Renderer>().material = audioScript.materials[ranNum01];
        }
        else {
            background.GetComponent.<Renderer>().material = audioScript.materials[ranNum02];
        }
    }

    if(haveLost) {

        if (!endSong.isPlaying) {
            endSong.Play();
        }

        ranBgInt = Random.Range(0, audioScript.materials.length);
        background.GetComponent.<Renderer>().material = audioScript.materials[ranBgInt];
        restartButton.SetActive(true);
        restartWithButton.SetActive(true);
        pointsText.color = Color.white;
    }
}

function playEndSong() {

}

function changeBG() {
    background.GetComponent.<Renderer>().material = audioScript.materials[audioScript.recordingNumber];
}

function startCountdown() {
    startPlaying();
}

function startPlaying() {
    pointsText.enabled = true;
    pointsText.color = Color.black;
    
    background.GetComponent.<Renderer>().material = whiteMaterial;

    audioScript.startStopRecButton.SetActive(false);
    //audioScript.stopRecButton.SetActive(false);
    audioScript.playRecButton.SetActive(false);
    audioScript.increaseRecButton.SetActive(false);

    if(Application.loadedLevelName == "CollideTwoCharacters" ) {
        ranNum01 = Random.Range(0, audioScript.recordedSounds.length-1);
        ranNum02 = Random.Range(0, audioScript.recordedSounds.length-1);

        while(ranNum01 == ranNum02) {
            ranNum02 = Random.Range(0, audioScript.recordedSounds.length-1);
        }

        var randSound01 : AudioSource = audioScript.recordedSounds[ranNum01]; 
        var randSound02 : AudioSource = audioScript.recordedSounds[ranNum02]; 

        Debug.Log(randSound01);
        Debug.Log(randSound02);

        randSound01.Play();
        yield WaitForSeconds(randSound01.clip.length);
        randSound02.Play();
    } else if(Application.loadedLevelName == "Enimies" ) {
        enemySpawnerScript.StartSpawning();
        //enemyScript = enemySpawnerScript.GetComponent.<enemyScript>();
    }

    
}

function isWinning() {
    haveWon = true;
}

function increasePoints() {
    points++;
    pointsText.text = points.ToString();
}

function restartGame() {
    Application.LoadLevel("StartScreen");
}

function resetAllVariables() {
    // Reset losing variable
    haveLost = false;
    endSong.Stop();
    // Reset points
    points = 0;
    pointsText.text = points.ToString();
    // Reset character positions
    for(var i : int = 0; i < audioScript.characters.length; i++) {
        audioScript.characters[i].transform.position = charactersPos[i].position;
        audioScript.characters[i].SetActive(true);
    }
    // Reset enemy speed
    enemySpawnerScript.enemySpeed = 0.1;
    // reset DeadMaterials
    enemySpawnerScript.deadMaterials = new String[7];
    enemySpawnerScript.deadMaterialCount = 0;
    // Hide restart buttons
    restartButton.SetActive(false);
    restartWithButton.SetActive(false);
    // Run startPlaying
    startPlaying();
}