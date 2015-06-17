#pragma strict

public var audioScript : AudioRecord;
public var gameControlScript : GameController;

public var deadMaterials : String[];

public var deadMaterialCount : int = 0;
public var spawnedEnemiesCount : int = 0;

public var enemySpeed : float = 0.1;

public var enemyPrefab : GameObject;
private var spawnedEnemy : GameObject;
private var spawnedEnemies : GameObject[];

private var isSpawning : boolean = false;

function Start () {
    deadMaterials = new String[7];
    spawnedEnemies = new GameObject[spawnedEnemiesCount+1];
}

function Update () {
    if(isSpawning) {
        SpawnEnemies();
    }
}

function StartSpawning() {
    isSpawning = true;
}

function SpawnEnemies() {

    var chosenMaterial : Material = audioScript.materials[Random.Range(0, audioScript.materials.length)];

    // Compare chosenMaterial to all deadMaterials to make sure it's not already dead
    if(deadMaterialCount < 6) {
        // Only spawn enemies, if less than 6 dead

        while(isMaterialDead(chosenMaterial)) {
            chosenMaterial = audioScript.materials[Random.Range(0, audioScript.materials.length)];
        }

        // Only spawn new enemy, if enemy is dead
        if(spawnedEnemy == null) {
            spawnedEnemy = Instantiate(enemyPrefab);
            spawnedEnemy.GetComponent.<Renderer>().material = chosenMaterial;
        }
    }
    else {
        // YOU LOST LOL
        gameControlScript.haveLost = true;
        isSpawning = false;
    }
    
}

// Takes one argument as the material to check for
function isMaterialDead(mat : Material) {
    // Check if the material is dead
    for(var i : int = 0; i < deadMaterialCount; i++) {
        if(deadMaterials[i] != null) {
            // If the material is in the deadMaterials array, then return true
            if(mat.name == deadMaterials[i]) {
                return true;
            }
            else if (i == deadMaterialCount - 1) {
                // If the material is not in the deadMaterials array, and we reached the end then return false
                return false;
            }
        }
    }
}