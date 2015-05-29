class Algos(object):
    def test(self):
        return "MON TEST"


    # success = 0 echec du test | 1 réussite du test
    # previous = [cours qui vient d'etre quitté, précédent, 2e précédent, 3e précédent]
    def retribution(previous,success):
    	pheromones=10
    	for i in range(0,3):
    		var=pheromones/(i+2)
    		link=Matrix.get(previous[i+1],previous[i])
    		if success==1:
    			link=Matrix.set(previous[i+1],previous[i],"plus",link[2]=link[2]+var)
    		else
				link=Matrix.set(previous[i+1],previous[i],"plus",link[2]=link[2]-var)