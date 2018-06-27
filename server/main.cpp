#include <iostream>
#include <vector>

int main()
{
  std::vector<int> vect{1, 2, 3, 4, 5};
  for (auto &el : vect)
    std::cout << " - " << el << std::endl;

  return 0;
}