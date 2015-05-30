class Algos(object):

	def test(self):
		return "MON TEST"

	def compare(self,i,j,previous):
		for k in len(previous):
			x = previous[k][0]
			y = previous[k][1]

			if ( (x==i) and (y==j) ):
				val =  (i > 20 ? (i-20)*0.1 : 0.1) # Oubli des cours (Au bout d'un certain on ne prend plus en compte le fait que l'utilisateur ait déjà suivi ce cours)
				return (val > 1) ? 1 : val
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
