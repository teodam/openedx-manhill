class Algos(object):

	base={}

	def test(self):
		return "MON TEST"

	def compare(self,i,j,previous):
		for k in len(previous):
			x = previous[k][0]
			y = previous[k][1]

			if ( (x==i) and (y==j) ):
				if (i > 20 ):
					val =  (i-20)*0.1
				else:
					val = 0.1
				if ( val > 1 ):
					return 1
				else:
					return val
		return 1

	def suggestions(self,tableau,previous):
		n=len(tableau)
		max1=[-1,-1]
		max2=[-1,-1]
		max3=[-1,-1]

		for i in range(0,n):
			score=tableau[i][2]-tableau[i][3]
			score*=self.compare(tableau[i][0],tableau[i][1],previous)
			if score>max1[0]:
				max1=[score,i]
			elif score>max2[0]:
				max2=[score,i]
			elif score>max3[0]:
				max3=[score,i]
		results = []
		if max1[1] != -1:
			results.append(tableau[max1[1]])
		if max2[1] != -1:
			results.append(tableau[max2[1]])
		if max3[1] != -1:
			results.append(tableau[max3[1]])

		return results

	def tick(self,matrix,previous,success):
		if len(previous) >=4:
			matrix.erosion(previous[0],0.9)
			matrix.retribution(previous,success)
			print matrix.getOut(previous[0])
			previous=previous[:20]
			return self.suggestions(matrix.getOut(previous[0]),previous)
		return []

	eloTable=[[99 ,677],[98 ,589],[97 ,538],[96 ,501],[95 ,470],[94 ,444],[93 ,422],[92 ,401],[91 ,383],[90 ,366],[89 ,351],[88 ,336],[87 ,322],[86 ,309],[85 ,296],[84 ,284],[83 ,273],[82 ,262],[81 ,251],[80 ,240],[79 ,230],[78 ,220],[77 ,211],[76 ,202],[75 ,193],[74 ,184],[73 ,175],[72 ,166],[71 ,158],[70 ,149],[69 ,141],[68 ,133],[67 ,125],[66 ,117],[65 ,110],[64 ,102],[63 ,95],[62 ,87],[61 ,80],[60 ,72],[59 ,65],[58 ,57],[57 ,50],[56 ,43],[55 ,36],[54 ,29],[53 ,21],[52 ,14],[51 ,7],[50 ,0],[49 ,-7],[48 ,-14],[47 ,-21],[46 ,-29],[45 ,-36],[44 ,-43],[43 ,-50],[42 ,-57],[41 ,-65],[40 ,-72],[39 ,-80],[38 ,-87],[37 ,-95],[36 ,-102],[35 ,-110],[34 ,-117],[33 ,-125],[32 ,-133],[31 ,-141],[30 ,-149],[29 ,-158],[28 ,-166],[27 ,-175],[26 ,-184],[25 ,-193],[24 ,-202],[23 ,-211],[22 ,-220],[21 ,-230],[20 ,-240],[19 ,-251],[18 ,-262],[17 ,-273],[16 ,-284],[15 ,-296],[14 ,-309],[13 ,-322],[12 ,-336],[11 ,-351],[10 ,-366],[9 ,-383],[8 ,-401],[7 ,-422],[6 ,-444],[5 ,-470],[4 ,-501],[3 ,-538],[2 ,-589],[1 ,-677]]

	def elo(self, eloj, elot, success):
		D=eloj-elot
		probaj = eloTable[0][0]
		probat = eloTable[0][0]
		i = 0
		while ( D>eloTable[i][1] ):
			probaj = eloTable[i][0];
			i+=1;
		while ( -D>eloTable[i][1] ):
			probaj = eloTable[i][0];
			i+=1;

		if succes:
			eloj=eloj+15*(success-probaj/100)
			elot=elot+15*(success-probat/100)
		else:
			elot=elot+15*(success-probat/100)
			eloj=eloj+15*(success-probaj/100)
		return [eloj, elot]
