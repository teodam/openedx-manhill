"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from algos import Algos
from Matrix import Matrix

from xblock.core import XBlock
from xblock.fields import Scope, Integer, List, String
from xblock.fragment import Fragment


class FourmisXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    previous = List(
        default=[],scope=Scope.user_info,
        help="User path accross application"
    )

    matrice = String(
        default='[]',
        scope=Scope.preferences,
        help="Matrice d'informations"
    )

    ok = Integer(
        default = 2
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the FourmisXBlock, shown to students
        when viewing courses.
        """
        self.pervious_s = 'previous : '.join(str(e) for e in self.previous)

        html = self.resource_string("static/html/fourmis.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/fourmis.css"))
        frag.add_javascript(self.resource_string("static/js/src/fourmis.js"))
        frag.initialize_js('FourmisXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.

    @XBlock.json_handler
    def nextPage(self,data,suffix=''):
        self.previous.insert(0,data['id'])
        return {'success' : 'true','url': data['id']}

    @XBlock.json_handler
    def matriceAlgo(self,data,suffix=''):

        return Matrix().fromJSON(self.matrice)

    @XBlock.json_handler
    def fourmisAlgo(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        m = Matrix()
        mat = self.matrice
        m.fromJSON(mat)

        datas = self.format(Algos().tick(m,self.previous,data["choix"]));

        self.matrice = m.toJSON()

        return datas

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("FourmisXBlock",
             """<vertical_demo>
                <fourmis/>
                </vertical_demo>
             """),
        ]
    def format(self,arr):
        datas = [{"id":""},{"id":""},{"id":""}];
        for i in range(0,len(arr)):
            datas[i]['id'] = arr[i][1]
        return datas
