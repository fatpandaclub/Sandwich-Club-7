#pragma strict

private var audioScript : AudioRecord;
private var enemySpawnScript : EnemySpawner;
private var gameControlScript : GameController;

private var thisEnemySpeed : float;

var spawnsOnRight : boolean;

function Start () {
    audioScript = GameObject.Find("Audio Controller").GetComponent.<AudioRecord>();
    enemySpawnScript = GameObject.Find("EnemyController").GetComponent.<EnemySpawner>();
    gameControlScript = GameObject.Find("GameController").GetComponent.<GameController>();

    if(gameControlScript.points % 5 == 0 && gameControlScript.points != 0) {
        enemySpawnScript.enemySpeed += 0.025;
        Debug.Log(enemySpawnScript.enemySpeed);
    }

    thisEnemySpeed = enemySpawnScript.enemySpeed;

    spawnsOnRight = Random.Range(0, 10) > 5;
    
    if(spawnsOnRight) {
        transform.position.x *= -1;
        thisEnemySpeed *= -1;
    }
}

function Update () {

    EnemyMove();

    if(spawnsOnRight) {
        if(transform.position.x < -9.32) {
            Destroy(gameObject);
        }
    }
    else {
        if(transform.position.x > 9.32) {
            Destroy(gameObject);
        }
    }
}

function OnCollisionEnter2D(col : Collision2D) {

    // When hit by enemy of same material, KILL CHARACTER
    if(GetComponent.<Renderer>().material.name == col.gameObject.GetComponent.<Renderer>().material.name) {

        // Before killing character, add their material to the deadMaterials
        // To compare, remove " (Instance)" from the nameString
        var materialNameString = col.gameObject.GetComponent.<Renderer>().material.name;
        var instanceString = " (Instance)";
        materialNameString = materialNameString.Substring(0, materialNameString.length-instanceString.length);
        enemySpawnScript.deadMaterials[enemySpawnScript.deadMaterialCount] = materialNameString;

        enemySpawnScript.gameObject.GetComponent.<AudioSource>().Play();

        // Increase the amount of deadMaterials added
        enemySpawnScript.deadMaterialCount++;
        col.gameObject.SetActive(false);
        //Destroy(col.gameObject);
    }

    // If one of the Characters are hit, then destroy this Enemy
    if(col.gameObject.tag == "Characters") {
        var charSound : AudioSource = col.gameObject.GetComponent.<AudioSource>();
        charSound.Play();

        Destroy(gameObject);
    }

    // If one of the Characters are hit, and it's not the same material, add points
    if(col.gameObject.tag == "Characters") {
        if( !(GetComponent.<Renderer>().material.name == col.gameObject.GetComponent.<Renderer>().material.name) ) {
            gameControlScript.increasePoints();
        }
    }
}

function EnemyMove() {

    var trans = new Vector3(transform.position.x + thisEnemySpeed, transform.position.y, 2);
    transform.position = trans;
}
