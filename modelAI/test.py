import numpy as np 
import pandas as pd 
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel 
import random

import unittest
from unittest.mock import patch
from recommend import content_based, item_based, predict_rating, CollaborativeFiltering, recommend


class TestRecommend(unittest.TestCase):
    def setUp(self):
        # Khởi tạo dữ liệu giả định
        data = {
            'Items': ['Item' + str(i) for i in range(40)],
            'User': ['User' + str(i) for i in range(40)],
            'Rating': [i % 5 + 1 for i in range(40)],
            'Description': ['Description' + str(i) for i in range(40)]
        }
        self.df = pd.DataFrame(data)

    def test_content_based(self):
        items = content_based('Item1', self.df)
        self.assertEqual(len(items), 10)

    def test_item_based(self):
        items = item_based('Item1', self.df)
        self.assertEqual(len(items), 10)

    def test_CollaborativeFiltering(self):
        recommendations = CollaborativeFiltering('Item1', 'User1', self.df)
        self.assertEqual(len(recommendations), 10)

    def test_recommend(self):
        recommendations = recommend('Item1', 'User1', self.df, isLogin=False)
        self.assertEqual(len(recommendations), 10)

if __name__ == '__main__':
    unittest.main()

