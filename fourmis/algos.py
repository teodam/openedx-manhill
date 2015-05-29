class Algos(object):

	def test(self):
		return "MON TEST"

	def compare(i,j,previous):
		for element in previous:
			x = element[0]
			y = element[1]

			if ( (x==i) and (y==j) ):
				return 1
		return 0

	def suggestions(tableau):
		n=len(tableau)
		max1=[-1,-1]
		max2=[-1,-1]
		max3=[-1,-1]

		for i in range(0,n):
			score=tableau[i][2]-tableau[i][3]
			if compare(tableau[i][0],tableau[i][1],previous):
				score*=0.1
			if score>max1[0]:
				max1=[score,i]
			elif score>max2[0]:
				max2=[score,i]
			elif score>max3[0]:
				max3=[score,i]
