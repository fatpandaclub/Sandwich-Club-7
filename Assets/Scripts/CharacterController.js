#pragma strict


var gameControllerScript : GameController;
var audioScript : AudioRecord;

var speed : float = 0.1;
var wp : Vector3;
var touchPos : Vector2;
var curScreenPoint : Vector3;
var curPosition : Vector3;
var screenPoint : Vector3;
var offset : Vector3;
var touchDeltaPosition : Vector3;

var center : Vector3;

public var audioz : AudioSource;


function Start () {

}

function Update () {

}


function ControlsTouch() {

    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) {

        if (GetComponent.<Collider2D>() == Physics2D.OverlapPoint(touchPos)) {

            audioz.Play();

            touchDeltaPosition = Input.GetTouch(0).deltaPosition;

            curScreenPoint = new Vector3(touchDeltaPosition.x, touchDeltaPosition.y, screenPoint.z);
            curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint);

            var height : float = transform.localScale.y;
    
            if(curPosition.y > height - 0.5) {
                transform.position = curPosition;
            }

            
        }

    }

}

function OnCollisionEnter2D(col : Collision2D) {
    
    if(Application.loadedLevelName == "CollideTwoCharacters" ) {
        if((gameObject.name == audioScript.characters[gameControllerScript.ranNum01].name && 
            col.gameObject.name == audioScript.characters[gameControllerScript.ranNum02].name) ||
            (gameObject.name == audioScript.characters[gameControllerScript.ranNum02].name && 
            col.gameObject.name == audioScript.characters[gameControllerScript.ranNum01].name)) {
                
                Debug.Log("COLLISION!!!!!");
                gameControllerScript.isWinning();
                
        }
    }
}


function OnMouseDown() {

    offset = this.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));

    audioz.Play();
}

function OnMouseDrag() {
    curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
    curPosition = Camera.main.ScreenToWorldPoint(curScreenPoint) + offset;

    var height : float = transform.localScale.y;
    
    if(curPosition.y > height - 0.5) {
        transform.position = curPosition;
    }
}



