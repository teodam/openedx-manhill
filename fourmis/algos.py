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
		max1=-1
		max2=-1
		max3=-1

		for i in range(0,n):
			score=tableau[i][2]-tableau[i][3]
			if compare(tableau[i][0],tableau[i][1],previous):
				score*=0.1
			if score>max1:
				max1=score
			elif score>max2:
				max2=score
			elif score>max3:
				max3=score
