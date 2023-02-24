function getRandomValue(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            usedSpecialAttack: 0,
            winner:null,
            gameOver:false,
            surrender: false,
            logMessages: [],
            valueTextColor: ''
        }
    },
    watch:{
        surrender(){
            if(this.surrender==true){
                this.gameOver=true;
                this.usedSpecialAttack=1;
                this.winner = 'monster'
            }
        },
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.usedSpecialAttack=1;
                this.winner = 'draw';
                this.gameOver=true;
            }else if(value<=0 && this.monsterHealth>0){
                this.gameOver=true;
                this.usedSpecialAttack=1;
                this.winner = 'monster';
            }else if(value>0 && this.monsterHealth<=0){
                this.gameOver=true;
                this.usedSpecialAttack=1;
                this.winner = 'player';
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner = 'draw';
                this.usedSpecialAttack=1;
                this.gameOver=true;
            }else if(value<=0 && this.playerHealth>0){
                this.winner = 'player';
                this.usedSpecialAttack=1;
                this.gameOver=true;
            }else if(value>0 && this.monsterHealth<=0){
                this.winner = 'monster';
                this.usedSpecialAttack=1;
                this.gameOver=true;
            }
        }
    },
    methods: {
        startingGame(){
            this.playerHealth= 100,
            this.monsterHealth= 100,
            this.usedSpecialAttack= 0,
            this.winner=null,
            this.gameOver=false,
            this.surrender = false,
            this.logMessages = []
        },
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth-=attackValue;
            if(this.monsterHealth<0){
                this.monsterHealth=0;
            }
            this.addLogMessage('You','attack',attackValue);
            this.attackPlayer();
            if(this.usedSpecialAttack%3!==0){
                this.usedSpecialAttack++;
            }
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            if(this.playerHealth<0){
                this.playerHealth=0;
            }
            this.addLogMessage('Monster','attack',attackValue);
        },
        specialAttack(){
            this.usedSpecialAttack++;
            const superAttackValue = getRandomValue(1,101);
            this.playerHealth-=40;
            this.monsterHealth-=superAttackValue;
            if(this.monsterHealth<0){
                this.monsterHealth=0;
            }
            if(this.playerHealth<0){
                this.playerHealth=0;
            }
            this.addLogMessage('You','special attack',superAttackValue);

        },
        healPlayer(){
            const healValue = getRandomValue(10,30);
            this.playerHealth+=healValue;
            if(this.playerHealth>100){
                this.playerHealth=100;
            }
            this.addLogMessage('You','heal',healValue);

            this.attackPlayer();
            if(this.usedSpecialAttack%3!==0){
                this.usedSpecialAttack++;
            }
            
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift(
                {
                    actionBy: who,
                    actionType: what,
                    actionValue: value
                }
            )
        }
    }
}).mount('#game')