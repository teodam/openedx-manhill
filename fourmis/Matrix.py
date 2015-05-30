import json

class Matrix(object):
	# i = from
	# j = to
    def __init__(self):
        self.table=[]

    def toJSON(self):
        return json.dumps(self.table)

    def fromJSON(self,j):
        self.table = json.loads(j)

    def same(self,i,j,previous):
       x = self.table[i][0]
       y = self.table[i][1]

       if ( (x == previous[j+1]) and (y == previous[j]) ):
           return 1
       else:
           return 0

    def retribution(self,previous, success):
        n=len(self.table)
        pheromones=10
        for j in range(0,3):
            created = 0
            var=pheromones/(j+2)
            for i in range(0,n):
                if self.same(i,j, previous):
                    self.table[i][3-success]+= var
                    created = 1
            if created ==0 :
                if success == 0:
                    self.table.append([previous[j+1],previous[j],0,var])
                else:
                    self.table.append([previous[j+1],previous[j],var,0])




    def erosion(self,j, coeff):
        n = len(self.table)
        for i in range(0,n):
            if self.table[i][1]==j:
                self.table[i][2]*=coeff
                self.table[i][3]*=coeff

    def getOut(self,i):
        results = []
        print self.table
        for elem in self.table:
            if elem[0] == i:
                results.append(elem)
        return results
