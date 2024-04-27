# Espionage.py written by Juan Moscoso
import math


# function to add two vectors
def add(vec1, vec2):
	return (vec1[0] + vec2[0], vec1[1] + vec2[1])

# function to subtract two vectors
def subtract(vec1, vec2):
	return (vec1[0] - vec2[0], vec1[1] - vec2[1])

# function to get the magnitude of a vector
def magnitude(vec):
	return math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])

# function to divide a vector by a scalar
def divide(vec, a):
	return (vec[0] / a, vec[1] / a)

# function to multiply a vector by a scalar
def scale(vec, a):
	return (vec[0] * a, vec[1] * a)


x1, y1, r1 = map(int, input().split())
x2, y2, r2 = map(int, input().split())

point_a = (x1, y1)
point_b = (x2, y2)




displace_vector_a = subtract(point_b, point_a)
normalized_vector_a = divide(displace_vector_a, magnitude(displace_vector_a))
scaled_vector_a = scale(normalized_vector_a, r1)
first_office_center = add(point_a, scaled_vector_a)


displace_vector_b = subtract(point_a, point_b)
normalized_vector_b = divide(displace_vector_b, magnitude(displace_vector_b))
scaled_vector_b = scale(normalized_vector_b, r2)
second_office_center = add(point_b, scaled_vector_b)
print(f"{first_office_center[0]:.6f} {first_office_center[1]:.6f} {second_office_center[0]:.6f} {second_office_center[1]:.6f}")
