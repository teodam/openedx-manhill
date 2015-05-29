class Matrix(object):
	# i = from
	# j = to
    def __init__():
        self.table=[]

    Matrix.add(1,2,1,3)
    add(1,2,PHENOM_PLUS,  2)
    add(1,2,PHENOM_MOINS, 2)


    def exist(i,j,previous):
       x = self.table[i][0]
       y = self.table[i][1]

       if ( (x == previous[j+1]) && (y == previous[j]) ):
            return 1
        else:
            return 0

    def retribution(previous, success):
        n=len(self.table)
        m=len(previous)
        if m>=4:
            pheromones=10
            for i in range(0,n):
                for j in range(0,3):
                    var=pheromones/(j+2)
                    if exist(i,j, previous):
                        self.table[i][3-success]+= var

    def erosion(j, coeff):
        n = len(self.table)
        for i in range(0,n):
            if self.table[i][1]==j
                self.table[i][2]*=0.9
                self.table[i][3]*=0.9
